import React, { useState, useEffect, useRef } from "react";
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
import getData from "../getData";
import axios from "axios";
import ItemImages from "../components/ItemImages";

export default function ProductPage() {
    const { id } = useParams();
    const product = item.find((p) => p._id === id);
    const navigation = useNavigate();

    const { main_color, secondColor, id: _id } = getData || {};
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef(null);
    const [showButton, setShowButton] = useState(true);

    // ✅ Detect mobile to show/hide "Order Now"


    // ✅ Ref for focusing input
    const nameInputRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowButton(!entry.isIntersecting); // If form is visible → hide button
            },
            { threshold: 0.2 } // percentage of form visible before hiding button
        );

        if (formRef.current) {
            observer.observe(formRef.current);
        }
        return () => observer.disconnect();
    }, []);
    // ✅ Prevent useEffect from running twice (Strict Mode)
    const hasVisited = useRef(false);
    useEffect(() => {
        if (hasVisited.current) return;
        hasVisited.current = true;

        const visit = async () => {
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
            } catch (error) {
                console.log(error);
            }
        };

        window.scrollTo({ top: 0, behavior: "smooth" });
        visit();
    }, []);

    // ✅ Product Variants
    const colorOptions =
        product?.Variants?.find((v) => v.type === "color")?.options || [];
    const sizeOptions =
        product?.Variants?.find((v) => v.type === "size")?.options || [];
    const [selectedColor, setSelectedColor] = useState(
        colorOptions[0]?.name || ""
    );
    const [selectedSize, setSelectedSize] = useState(
        sizeOptions[0]?.name || ""
    );

    // ✅ Form state
    const [availableCities, setAvailableCities] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        ride: 0,
        phone: "",
        state: "",
        city: "",
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
        price: 0,
    });

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            color: selectedColor,
            size: selectedSize,
        }));
    }, [selectedColor, selectedSize]);

    // ✅ Input handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
            ride: stateObj?.prix_initial || 0,
        }));
    };

    const increaseQuantity = () => {
        setFormData((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
    };
    const decreaseQuantity = () => {
        setFormData((prev) => ({
            ...prev,
            quantity: Math.max(1, prev.quantity - 1),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // ✅ إرسال الطلب إلى الـ API
            await axios.post(`https://true-fit-dz-api.vercel.app/order`, {
                ...formData,
                item: product,
                userId: product.userId,
                price: product.price,
            });

            // ✅ Facebook Pixel - Purchase Event
            ReactPixel.track("Purchase", {
                value: product.price * formData.quantity, // المبلغ الكلي
                currency: "DZD",                          // العملة
                content_ids: [product.id],                // ID المنتج
                content_type: "product",
                quantity: formData.quantity,
            });

            // ✅ تحويل المستخدم لصفحة الشكر
            navigation("/thanks");
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!product) {
        return (
            <div className="p-10 text-center text-red-500">
                ❌ Product not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-inter">

            {/* ✅ زر الطلب للهواتف */}
            {showButton && (
                <div className="fixed bottom-5 left-0 w-full flex justify-center z-50">
                    <button
                        onClick={() => {
                            nameInputRef.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                            });
                            setTimeout(() => nameInputRef.current?.focus(), 600);
                        }}
                        className="w-10/12 py-3 px-4 rounded-2xl text-white font-medium shadow-md"
                        style={{ background: main_color }}
                    >
                        اطلب الآن
                    </button>
                </div>
            )}

            <main className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <ItemImages product={product} main_color={main_color} />
                    {/* ✅ تفاصيل المنتج + النموذج */}
                    <div className="flex flex-col space-y-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                {product.name}
                            </h1>
                            <p className="text-3xl font-bold mt-2" style={{ color: main_color }}>
                                دج {product.price.toLocaleString()}
                            </p>
                            <p className="text-gray-600 mt-4">
                                {product.ShortDescription}
                            </p>
                        </div>

                        {/* ✅ الألوان */}
                        {colorOptions.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">
                                    اللون: <span className="font-semibold">{selectedColor}</span>
                                </h3>
                                <div className="flex gap-3 mt-3">
                                    {colorOptions.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className="w-8 h-8 rounded-full"
                                            style={{
                                                backgroundColor: color.color,
                                                outline: selectedColor === color.name ? `2px solid ${main_color}` : "none",
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ✅ المقاسات */}
                        {sizeOptions.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">
                                    المقاس: <span className="font-semibold">{selectedSize}</span>
                                </h3>
                                <div className="flex gap-3 mt-3">
                                    {sizeOptions.map((size) => (
                                        <button
                                            key={size.name}
                                            onClick={() => setSelectedSize(size.name)}
                                            className="w-12 h-10 flex items-center justify-center rounded-md border text-sm font-medium"
                                            style={{
                                                borderColor: selectedSize === size.name ? main_color : "#D1D5DB",
                                                backgroundColor: selectedSize === size.name ? secondColor : "white",
                                                color: selectedSize === size.name ? main_color : "#374151",
                                            }}
                                        >
                                            {size.name.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ✅ نموذج الطلب */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                <h3 className="text-xl font-semibold">أكمل طلبك</h3>

                                {/* الاسم */}
                                <div className="relative">
                                    <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                                        <User size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        ref={nameInputRef}
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3"
                                        placeholder="الاسم الكامل"
                                    />
                                </div>

                                {/* الهاتف */}
                                <div className="relative">
                                    <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                                        <Phone size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3"
                                        placeholder="رقم الهاتف"
                                    />
                                </div>

                                {/* الولاية والمدينة */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                                            <MapPin size={18} className="text-gray-400" />
                                        </div>
                                        <select
                                            name="state"
                                            value={states.find((s) => s.name === formData.state)?.code || ""}
                                            onChange={handleStateChange}
                                            required
                                            className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3"
                                        >
                                            <option value="">اختر الولاية</option>
                                            {states.map((s) => (
                                                <option key={s.code} value={s.code}>{s.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute left-3 inset-y-0 flex items-center pointer-events-none">
                                            <Building size={18} className="text-gray-400" />
                                        </div>
                                        <select
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            disabled={!formData.state}
                                            required
                                            className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3 disabled:bg-gray-100"
                                        >
                                            <option value="">اختر المدينة</option>
                                            {availableCities.map((c) => (
                                                <option key={c.name} value={c.name}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                {/* ✅ الكمية */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        الكمية
                                    </label>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={decreaseQuantity}
                                            className="w-10 h-10 border flex items-center justify-center rounded-l-md"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <div className="w-12 h-10 border-t border-b flex items-center justify-center">
                                            {formData.quantity}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={increaseQuantity}
                                            className="w-10 h-10 border flex items-center justify-center rounded-r-md"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* ✅ ملخص السعر */}
                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>السعر الفرعي:</span>
                                        <span className="font-medium">
                                            دج {(formData.quantity * product.price).toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>سعر التوصيل:</span>
                                        <span className="font-medium">
                                            دج {formData.ride.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>المجموع الكلي:</span>
                                        <span style={{ color: main_color }}>
                                            دج {(formData.quantity * product.price + (formData.ride || 0)).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* ✅ زر إرسال الطلب */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full text-white py-3 px-4 rounded-lg flex items-center justify-center"
                                    style={{
                                        backgroundColor: main_color,
                                        boxShadow: `0 4px 14px 0 ${secondColor}`,
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin mr-2" />
                                            جاري المعالجة...
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
