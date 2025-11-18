import React, { useState, useEffect, useRef, useMemo } from "react";
import item from "../item.json";
import states from "../constans/states.json";
import citie from "../constans/etat";

import {
    User,
    Phone,
    ShoppingCart,
    Minus,
    Plus,
    Loader2,
    MapPin,
    Building,
} from "lucide-react";

import ReactPixel from "react-facebook-pixel";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ItemImages from "../components/ItemImages";
import getData from "../getData";

export default function ProductPage() {
    const { id } = useParams();
    const product = item.find((p) => p._id === id);
    const navigate = useNavigate();

    const { main_color, secondColor, id: _id } = getData;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const formRef = useRef(null);
    const inputFocusRef = useRef(null);

    // 🟢 Initialize Facebook Pixel Once
    useEffect(() => {
        ReactPixel.init("YOUR_PIXEL_ID");
    }, []);

    // 🟢 Hide "Order Now" Button When Form Visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setShowButton(!entry.isIntersecting),
            { threshold: 0.2 }
        );

        if (formRef.current) observer.observe(formRef.current);
        return () => observer.disconnect();
    }, []);

    // 🟢 Visit Tracking
    useEffect(() => {
        (async () => {
            try {
                await axios.put(
                    `https://true-fit-dz-api.vercel.app/user/visit/${_id}`,
                    {
                        last_visit: new Date().toISOString(),
                        page: "productpage",
                        productName: product?.name || "",
                        image: product?.images[0] || "",
                    }
                );
            } catch (err) {
                console.log(err);

            }
        })();
    }, []);


    // 🟢 Variants
    const colorOptions = product?.Variants?.find((v) => v.type === "color")?.options || [];
    const sizeOptions = product?.Variants?.find((v) => v.type === "size")?.options || [];

    const [selectedColor, setSelectedColor] = useState(colorOptions[0]?.name || "");
    const [selectedSize, setSelectedSize] = useState(sizeOptions[0]?.name || "");

    // 🟢 Form State
    const [availableCities, setAvailableCities] = useState([]);

    const [ride, setRide] = useState({ home: 0, office: 0 });

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        state: "",
        city: "",
        home: true,
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
    });

    // 🟢 Sync Variants
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            color: selectedColor,
            size: selectedSize,
        }));
    }, [selectedColor, selectedSize]);

    // 🟢 Handle Inputs
    const handleInputChange = (e) => {
        let { name, value } = e.target;

        if (name === "home") value = value === "true";

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleStateChange = (e) => {
        const stateCode = e.target.value;
        const stateObj = states.find((s) => s.code === stateCode);
        const cities = citie.filter((c) => c.state_code === stateCode);

        setAvailableCities(cities);

        setFormData((prev) => ({
            ...prev,
            state: stateObj?.name || "",
            city: "",
        }));

        setRide({
            home: stateObj?.prix_initial || 0,
            office: stateObj?.stop_back || 0,
        });
    };

    // 🟢 Quantity
    const increaseQuantity = () =>
        setFormData((p) => ({ ...p, quantity: p.quantity + 1 }));

    const decreaseQuantity = () =>
        setFormData((p) => ({ ...p, quantity: Math.max(1, p.quantity - 1) }));

    // 🟢 Calculations
    const deliveryCost = formData.home ? ride.home : ride.office;

    const totalPrice = useMemo(
        () => product.price * formData.quantity + deliveryCost,
        [formData, deliveryCost]
    );

    // 🟢 Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.state) return alert("يرجى اختيار الولاية");
        if (!formData.city) return alert("يرجى اختيار المدينة");

        setIsSubmitting(true);

        try {
            await axios.post("https://true-fit-dz-api.vercel.app/order", {
                ...formData,
                item: product,
                userId: product.userId,
                price: product.price,
                ride: deliveryCost
            });

            ReactPixel.track("Purchase", {
                value: product.price * formData.quantity,
                currency: "DZD",
                content_ids: [product.id],
                content_type: "product",
                quantity: formData.quantity,
            });

            navigate("/thanks");
        } catch (err) {
            console.log(err);
        }

        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-inter">

            {/* 🟢 Mobile Order Button */}
            {showButton && (
                <div className="fixed bottom-5 left-0 w-full flex justify-center z-50">
                    <button
                        onClick={() => {
                            inputFocusRef.current?.scrollIntoView({ behavior: "smooth" });
                            setTimeout(() => inputFocusRef.current?.focus(), 600);
                        }}
                        className="w-10/12 py-3 px-4 rounded-2xl text-white font-medium shadow-md"
                        style={{ background: main_color }}
                    >
                        اطلب الآن
                    </button>
                </div>
            )}

            <main className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* 🟢 Images */}
                    <ItemImages product={product} main_color={main_color} />

                    {/* 🟢 Product Details + Form */}
                    <div className="flex flex-col space-y-6">

                        {/* 🟢 Title */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                {product.name}
                            </h1>

                            <p className="text-3xl font-bold mt-2" style={{ color: main_color }}>
                                دج {product.price.toLocaleString()}
                            </p>

                            <p className="text-gray-600 mt-4 leading-relaxed">
                                {product.ShortDescription}
                            </p>
                        </div>

                        {/* 🟢 Color Options */}
                        {colorOptions.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">
                                    اللون: <span className="font-semibold">{selectedColor}</span>
                                </h3>

                                <div className="flex gap-3 mt-3">
                                    {colorOptions.map((c) => (
                                        <button
                                            key={c.name}
                                            onClick={() => setSelectedColor(c.name)}
                                            className="w-8 h-8 rounded-full border"
                                            style={{
                                                backgroundColor: c.color,
                                                outline:
                                                    selectedColor === c.name
                                                        ? `2px solid ${main_color}`
                                                        : "none",
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 🟢 Size Options */}
                        {sizeOptions.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">
                                    المقاس: <span className="font-semibold">{selectedSize}</span>
                                </h3>

                                <div className="flex gap-3 mt-3">
                                    {sizeOptions.map((s) => (
                                        <button
                                            key={s.name}
                                            onClick={() => setSelectedSize(s.name)}
                                            className="w-12 h-10 flex items-center justify-center rounded-md border text-sm font-medium"
                                            style={{
                                                borderColor:
                                                    selectedSize === s.name ? main_color : "#D1D5DB",
                                                backgroundColor:
                                                    selectedSize === s.name ? secondColor : "white",
                                                color:
                                                    selectedSize === s.name ? main_color : "#374151",
                                            }}
                                        >
                                            {s.name.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 🟢 ORDER FORM */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">

                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

                                <h3 className="text-xl font-semibold mb-4">أكمل طلبك</h3>

                                {/* Name */}
                                <div className="relative">
                                    <User size={18} className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        ref={inputFocusRef}
                                        type="text"
                                        name="name"
                                        required
                                        className="pl-10 w-full rounded-md border border-gray-300 py-3 px-3"
                                        placeholder="الاسم الكامل"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Phone */}
                                <div className="relative">
                                    <Phone size={18} className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        className="pl-10 w-full rounded-md border border-gray-300 py-3 px-3"
                                        placeholder="رقم الهاتف"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Wilaya + City */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div className="relative">
                                        <MapPin size={18} className="absolute left-3 top-3 text-gray-400" />
                                        <select
                                            onChange={handleStateChange}
                                            required
                                            className="pl-10 w-full rounded-md border border-gray-300 py-3 px-3"
                                        >
                                            <option value="">اختر الولاية</option>
                                            {states.map((s) => (
                                                <option key={s.code} value={s.code}>
                                                    {s.ar_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="relative">
                                        <Building size={18} className="absolute left-3 top-3 text-gray-400" />
                                        <select
                                            name="city"
                                            disabled={!formData.state}
                                            onChange={handleInputChange}
                                            required
                                            className="pl-10 w-full rounded-md border border-gray-300 py-3 px-3 disabled:bg-gray-100"
                                        >
                                            <option value="">اختر المدينة</option>
                                            {availableCities.map((c) => (
                                                <option key={c.code} value={c.name}>
                                                    {c.ar_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Delivery Type */}
                                <select
                                    name="home"
                                    value={formData.home}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full rounded-md border border-gray-300 py-3 px-3"
                                >
                                    <option value="true">توصيل للمنزل</option>
                                    <option value="false">توصيل للمكتب</option>
                                </select>

                                {/* Quantity */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">الكمية</label>

                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={decreaseQuantity}
                                            className="w-10 h-10 border rounded-l-md flex items-center justify-center"
                                        >
                                            <Minus size={16} />
                                        </button>

                                        <div className="w-12 h-10 border flex items-center justify-center font-semibold">
                                            {formData.quantity}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={increaseQuantity}
                                            className="w-10 h-10 border rounded-r-md flex items-center justify-center"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Price Summary */}
                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>السعر:</span>
                                        <span className="font-medium">
                                            دج {(formData.quantity * product.price).toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>التوصيل:</span>
                                        <span className="font-medium">
                                            دج {deliveryCost.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>المجموع:</span>
                                        <span style={{ color: main_color }}>
                                            دج {totalPrice.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        backgroundColor: main_color,
                                        boxShadow: `0 4px 14px 0 ${secondColor}`,
                                    }}
                                    className="w-full text-white py-3 px-4 rounded-lg flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin mr-2" />
                                            جاري إرسال الطلب...
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart size={20} className="mr-2" />
                                            تأكيد الطلب
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
