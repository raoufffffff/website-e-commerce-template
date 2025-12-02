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
    CheckCircle2,
    Gift,
    Tag,
} from "lucide-react";

import ReactPixel from "react-facebook-pixel";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ItemImages from "../components/ItemImages";
import getData from "../getData";

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // 🟢 Destructure language & pixel for translation
    const { main_color, secondColor, id: _id, language, facebookPixel } = getData;
    const isAr = language === "ar";

    // 🟢 Safety Check: Handle case where product isn't found
    const product = item.find((p) => String(p._id) === String(id));

    // 🟢 Handle Offers (Check both 'Offers' and 'order' in case JSON name changes)
    const offers = product?.Offers || product?.order || [];

    // --- Translations ---
    const t = {
        currency: "DA",
        orderNow: isAr ? "اطلب الآن" : "Commander maintenant",
        color: isAr ? "اللون" : "Couleur",
        size: isAr ? "المقاس" : "Taille",
        completeOrder: isAr ? "أكمل طلبك" : "Compléter votre commande",
        namePlaceholder: isAr ? "الاسم الكامل" : "Nom complet",
        phonePlaceholder: isAr ? "رقم الهاتف" : "Numéro de téléphone",
        selectState: isAr ? "اختر الولاية" : "Sélectionnez une wilaya",
        selectCity: isAr ? "اختر المدينة" : "Sélectionnez une commune",
        homeDelivery: isAr ? "توصيل للمنزل" : "Livraison à domicile",
        officeDelivery: isAr ? "توصيل للمكتب (Stop desk)" : "Livraison au bureau (Stop desk)",
        quantity: isAr ? "الكمية" : "Quantité",
        price: isAr ? "السعر" : "Prix",
        delivery: isAr ? "التوصيل" : "Livraison",
        total: isAr ? "المجموع" : "Total",
        submitting: isAr ? "جاري إرسال الطلب..." : "Envoi en cours...",
        confirm: isAr ? "تأكيد الطلب" : "Confirmer la commande",
        alertState: isAr ? "يرجى اختيار الولاية" : "Veuillez sélectionner une wilaya",
        alertCity: isAr ? "يرجى اختيار المدينة" : "Veuillez sélectionner une commune",
        specialOfferTitle: isAr ? "عرض خاص" : "Offre Spéciale",
        buy: isAr ? "اشتري" : "Achetez",
        for: isAr ? "بسعر" : "pour",
        freeShipping: isAr ? "توصيل مجاني" : "Livraison Gratuite",
        bestValue: isAr ? "أفضل قيمة" : "Meilleure valeur"
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const formRef = useRef(null);
    const inputFocusRef = useRef(null);

    // 🟢 Initialize Facebook Pixel
    useEffect(() => {
        if (!facebookPixel?.id) return;
        ReactPixel.init(facebookPixel.id, {}, { autoConfig: true, debug: false });
    }, [facebookPixel]);

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
    const hasVisited = useRef(false);
    useEffect(() => {
        if (hasVisited.current || !product) return;
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
    }, [product, _id]);

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
        offer: false,
        freeDelivery: false
    });

    const [selectedOffer, setSelectedOffer] = useState(null);

    // 🟢 Select Offer Logic
    const selectOffer = (offer) => {
        // If clicking the same offer, toggle it off
        if (selectedOffer?.id === offer.id) {
            setSelectedOffer(null);
            setFormData((prev) => ({
                ...prev,
                quantity: 1,
                offer: false,
                freeDelivery: false
            }));
            return;
        }

        // Apply new offer
        setSelectedOffer(offer);
        setFormData((prev) => ({
            ...prev,
            quantity: Number(offer.Quantity),
            offer: true,
            freeDelivery: offer.freedelevry // Make sure JSON key is correct (freedelevry vs freeDelivery)
        }));
    };

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

    // 🟢 Handle State Change
    const handleStateChange = (e) => {
        const stateCode = e.target.value;
        const stateObj = states.find((s) => String(s.code) === String(stateCode));
        const cities = citie.filter((c) => String(c.state_code) === String(stateCode));

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

    // 🟢 Quantity Controls
    const increaseQuantity = () => {
        setFormData((p) => ({ ...p, quantity: p.quantity + 1, offer: false, freeDelivery: false }));
        setSelectedOffer(null); // Reset offer if user manually changes quantity
    };

    const decreaseQuantity = () => {
        setFormData((p) => ({ ...p, quantity: Math.max(1, p.quantity - 1), offer: false, freeDelivery: false }));
        setSelectedOffer(null); // Reset offer if user manually changes quantity
    };

    // 🟢 Calculations
    const productPrice = product?.price || 0;
    const deliveryCost = formData.home ? ride.home : ride.office;

    const totalPrice = useMemo(() => {
        let itemTotal;
        let deliveryTotal = formData.freeDelivery ? 0 : deliveryCost;

        if (selectedOffer) {
            itemTotal = Number(selectedOffer.price);
        } else {
            itemTotal = formData.quantity * productPrice;
        }
        return itemTotal + deliveryTotal;
    }, [formData.quantity, formData.freeDelivery, deliveryCost, productPrice, selectedOffer]);

    // 🟢 Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.state) return alert(t.alertState);
        if (!formData.city) return alert(t.alertCity);

        setIsSubmitting(true);

        try {
            await axios.post("https://true-fit-dz-api.vercel.app/order", {
                ...formData,
                item: product,
                userId: product.userId,
                price: product.price,
                // 🛑 CRITICAL FIX: Check formData.freeDelivery, NOT selectedOffer.freeDelivery
                ride: formData.freeDelivery ? 0 : deliveryCost,
                total: totalPrice,
            });

            ReactPixel.track("Purchase", {
                value: totalPrice,
                currency: "DZD",
                content_ids: [product._id],
                content_type: "product",
                quantity: formData.quantity,
            });

            navigate("/thanks");
        } catch (err) {
            console.log(err);
        }

        setIsSubmitting(false);
    };

    if (!product) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-gray-50 font-inter" dir={isAr ? "rtl" : "ltr"}>

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
                        {t.orderNow}
                    </button>
                </div>
            )}

            <main className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* 🟢 Images */}
                    <ItemImages product={product} main_color={main_color} language={language} />

                    {/* 🟢 Product Details + Form */}
                    <div className="flex flex-col space-y-6">

                        {/* 🟢 Title */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                {product.name}
                            </h1>

                            <p className="text-3xl font-bold mt-2" style={{ color: main_color }}>
                                {t.currency} {product.price.toLocaleString()}
                            </p>

                            <p className="text-gray-600 mt-4 leading-relaxed">
                                {product.ShortDescription}
                            </p>
                        </div>

                        {/* 🟢 Color Options */}
                        {colorOptions.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">
                                    {t.color}: <span className="font-semibold">{selectedColor}</span>
                                </h3>
                                <div className="flex gap-3 mt-3">
                                    {colorOptions.map((c) => (
                                        <button
                                            key={c.name}
                                            onClick={() => setSelectedColor(c.name)}
                                            className="w-8 h-8 rounded-full border transition-transform hover:scale-110"
                                            style={{
                                                backgroundColor: c.color,
                                                outline: selectedColor === c.name
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
                                    {t.size}: <span className="font-semibold">{selectedSize}</span>
                                </h3>
                                <div className="flex gap-3 mt-3">
                                    {sizeOptions.map((s) => (
                                        <button
                                            key={s.name}
                                            onClick={() => setSelectedSize(s.name)}
                                            className="w-12 h-10 flex items-center justify-center rounded-md border text-sm font-medium transition-colors"
                                            style={{
                                                borderColor: selectedSize === s.name ? main_color : "#D1D5DB",
                                                backgroundColor: selectedSize === s.name ? secondColor : "white",
                                                color: selectedSize === s.name ? main_color : "#374151",
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

                                <h3 className="text-xl font-semibold mb-4">{t.completeOrder}</h3>

                                {/* Name */}
                                <div className="relative">
                                    <User size={18} className={`absolute top-3 text-gray-400 ${isAr ? 'right-3' : 'left-3'}`} />
                                    <input
                                        ref={inputFocusRef}
                                        type="text"
                                        name="name"
                                        required
                                        className={`w-full rounded-md border border-gray-300 py-3 ${isAr ? 'pr-10 pl-3' : 'pl-10 pr-3'}`}
                                        placeholder={t.namePlaceholder}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Phone */}
                                <div className="relative">
                                    <Phone size={18} className={`absolute top-3 text-gray-400 ${isAr ? 'right-3' : 'left-3'}`} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        className={`w-full rounded-md border border-gray-300 py-3 ${isAr ? 'pr-10 pl-3' : 'pl-10 pr-3'}`}
                                        placeholder={t.phonePlaceholder}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Wilaya + City */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div className="relative">
                                        <MapPin size={18} className={`absolute top-3 text-gray-400 ${isAr ? 'right-3' : 'left-3'}`} />
                                        <select
                                            onChange={handleStateChange}
                                            required
                                            className={`w-full rounded-md border border-gray-300 py-3 ${isAr ? 'pr-10 pl-3' : 'pl-10 pr-3'}`}
                                        >
                                            <option value="">{t.selectState}</option>
                                            {states.map((s) => (
                                                <option key={s.code} value={s.code}>
                                                    {isAr ? s.ar_name : s.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="relative">
                                        <Building size={18} className={`absolute top-3 text-gray-400 ${isAr ? 'right-3' : 'left-3'}`} />
                                        <select
                                            name="city"
                                            disabled={!formData.state}
                                            onChange={handleInputChange}
                                            required
                                            className={`w-full rounded-md border border-gray-300 py-3 disabled:bg-gray-100 ${isAr ? 'pr-10 pl-3' : 'pl-10 pr-3'}`}
                                        >
                                            <option value="">{t.selectCity}</option>
                                            {availableCities.map((c) => (
                                                <option key={c.code} value={c.name}>
                                                    {isAr ? c.ar_name : c.name}
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
                                    <option value="true">{t.homeDelivery}</option>
                                    <option value="false">{t.officeDelivery}</option>
                                </select>

                                {/* Quantity */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">{t.quantity}</label>

                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={decreaseQuantity}
                                            className={`w-10 h-10 border flex items-center justify-center hover:bg-gray-100 ${isAr ? 'rounded-r-md' : 'rounded-l-md'}`}
                                        >
                                            <Minus size={16} />
                                        </button>

                                        <div className="w-12 h-10 border-t border-b flex items-center justify-center font-semibold">
                                            {formData.quantity}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={increaseQuantity}
                                            className={`w-10 h-10 border flex items-center justify-center hover:bg-gray-100 ${isAr ? 'rounded-l-md' : 'rounded-r-md'}`}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* 🟢 OFFERS LIST */}
                                {offers.length > 0 && (
                                    <div className="grid gap-3 mt-4">
                                        {offers.map((offer) => {
                                            // Don't show invalid quantities
                                            if (Number(offer.Quantity) < 1) return null;

                                            // Check if this offer is active
                                            const isActive = selectedOffer?.id === offer.id;

                                            return (
                                                <div
                                                    key={offer.id || Math.random()}
                                                    onClick={() => selectOffer(offer)}
                                                    className={`cursor-pointer relative overflow-hidden rounded-xl border p-4 transition-all hover:shadow-md ${isActive ? 'bg-amber-50 border-2' : 'bg-white border-gray-200'}`}
                                                    style={{ borderColor: isActive ? main_color : '#E5E7EB' }}
                                                >
                                                    {isActive && (
                                                        <div className={`absolute top-0 ${isAr ? 'left-0' : 'right-0'} bg-green-500 text-white p-1 rounded-bl-lg z-10`}>
                                                            <CheckCircle2 size={16} />
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-3 rounded-full flex-shrink-0 ${isActive ? 'bg-white' : 'bg-gray-100'}`}>
                                                            {Number(offer.Quantity) >= 3 ? (
                                                                <Gift size={24} style={{ color: main_color }} />
                                                            ) : (
                                                                <Tag size={24} style={{ color: main_color }} />
                                                            )}
                                                        </div>

                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="font-bold text-gray-900">
                                                                    {offer.name || t.specialOfferTitle}
                                                                </h3>
                                                                {isActive && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{t.bestValue}</span>}
                                                            </div>

                                                            <p className="text-sm text-gray-600 mt-1">
                                                                {t.buy} <span className="font-bold">{offer.Quantity}</span> {t.for} <span className="font-bold text-lg" style={{ color: main_color }}>{Number(offer.price).toLocaleString()} {t.currency}</span>
                                                            </p>

                                                            {offer.freedelevry && (
                                                                <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                                                                    <CheckCircle2 size={12} /> {t.freeShipping}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                                {/* Price Summary */}
                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>{t.price}:</span>
                                        <span className="font-medium">
                                            {t.currency} {(selectedOffer ? Number(selectedOffer.price) : formData.quantity * product.price).toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>{t.delivery}:</span>
                                        <div>
                                            <span className={`font-medium ${formData.freeDelivery ? 'line-through text-red-500 mx-1' : ''}`}>
                                                {t.currency} {deliveryCost.toLocaleString()}
                                            </span>
                                            {formData.freeDelivery && (
                                                <span className="text-green-600 font-medium">
                                                    {isAr ? 'توصيل مجاني' : 'Livraison Gratuite'}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-between text-lg font-semibold">
                                        <span>{t.total}:</span>
                                        <span style={{ color: main_color }}>
                                            {t.currency} {totalPrice.toLocaleString()}
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
                                    className="w-full text-white py-3 px-4 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={20} className={`animate-spin ${isAr ? 'ml-2' : 'mr-2'}`} />
                                            {t.submitting}
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart size={20} className={isAr ? 'ml-2' : 'mr-2'} />
                                            {t.confirm}
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