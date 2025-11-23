import { useState } from 'react'
import { ShoppingCart, User, Phone } from 'lucide-react';
import etat from '../constans/etat'
import states from '../constans/states.json'
import getData from '../getData';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ItemForm = ({ product, buy }) => {
    const navigation = useNavigate()

    const { main_color, secondColor, id, language } = getData

    const colorOptions = product.Variants?.find((v) => v.type === 'color')?.options || [];
    const sizeOptions = product.Variants?.find((v) => v.type === 'size')?.options || [];

    const [selectedColor, setSelectedColor] = useState(colorOptions[0]?.name || '');
    const [selectedSize, setSelectedSize] = useState(sizeOptions[0]?.name || '');
    const [city, setCity] = useState([]);

    const [formData, setFormData] = useState({
        userId: id,
        name: '',
        ride: 0,
        phone: '',
        state: '',
        city: '',
        quantity: 1,
        color: colorOptions[0]?.name || '',
        size: sizeOptions[0]?.name || '',
        item: product,
        price: product.price
    });

    // --- Translation Logic ---
    const isAr = language === "ar" ? true : false;
    const t = {
        color: isAr ? "اللون" : "Couleur",
        size: isAr ? "المقاس" : "Taille",
        header: isAr ? "أكمل طلبك" : "Commander maintenant",
        nameLabel: isAr ? "الاسم الكامل" : "Nom complet",
        namePlaceholder: isAr ? "أدخل اسمك الكامل" : "Votre nom complet",
        phoneLabel: isAr ? "رقم الهاتف" : "Numéro de téléphone",
        phonePlaceholder: isAr ? "أدخل رقم هاتفك" : "Votre numéro de téléphone",
        stateLabel: isAr ? "الولاية" : "Wilaya",
        statePlaceholder: isAr ? "اختر الولاية" : "Sélectionnez une wilaya",
        cityLabel: isAr ? "البلدية" : "Commune",
        cityPlaceholder: isAr ? "اختر البلدية" : "Sélectionnez une commune",
        quantityLabel: isAr ? "الكمية" : "Quantité",
        productPrice: isAr ? "سعر المنتج" : "Prix du produit",
        deliveryFee: isAr ? "تكلفة التوصيل" : "Frais de livraison",
        total: isAr ? "المجموع" : "Total",
        submitButton: isAr ? "تأكيد الطلب" : "Confirmer la commande",
        currency: "DA"
    };

    // --- Quantity Handlers ---
    const decreaseQuantity = () => {
        if (formData.quantity > 1) {
            setFormData({ ...formData, quantity: formData.quantity - 1 });
        }
    };

    const increaseQuantity = () => {
        setFormData({ ...formData, quantity: formData.quantity + 1 });
    };

    // --- Input Handlers ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleStateChange = (e) => {
        const { value } = e.target;
        const state = states.find(s => s.code === value);
        const c = etat.filter(city => city.state_code === value);
        setCity(c);
        // Default ride price setup (assuming state.prix_initial exists)
        setFormData({ ...formData, state: state?.name || '', city: '', ride: state?.prix_initial || 0 });
    };

    // --- Submit ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://true-fit-dz-api.vercel.app/order`, formData);
            if (buy) buy(); // Check if buy function exists before calling
            navigation('/thanks');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="md:col-span-1" dir={isAr ? "rtl" : "ltr"}>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-2xl font-bold mt-2" style={{ color: main_color }}>
                {t.currency} {product.price}
            </p>
            <p className="text-gray-600 mt-4">{product.ShortDescription}</p>
            {/* --- Color Selector --- */}
            {colorOptions.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900">{t.color}</h3>
                    <div className="flex space-x-3 mt-2">
                        {colorOptions.map((color) => (
                            <button
                                key={color.name}
                                type="button"
                                onClick={() => {
                                    setFormData({ ...formData, color: color.name });
                                    setSelectedColor(color.name);
                                }}
                                className="w-8 h-8 rounded-full"
                                style={{
                                    backgroundColor: color.color,
                                    border: selectedColor === color.name
                                        ? `2px solid ${main_color}`
                                        : '1px solid #ccc',
                                }}
                                aria-label={color.name}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* --- Size Selector --- */}
            {sizeOptions.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-900">{t.size}</h3>
                    <div className="flex space-x-3 mt-2">
                        {sizeOptions.map((size) => (
                            <button
                                key={size.name}
                                type="button"
                                onClick={() => {
                                    setSelectedSize(size.name);
                                    setFormData({ ...formData, size: size.name });
                                }}
                                className="w-10 h-10 flex items-center justify-center rounded-md border"
                                style={{
                                    borderColor: selectedSize === size.name ? main_color : '#ccc',
                                    backgroundColor: selectedSize === size.name ? secondColor : 'transparent',
                                    color: selectedSize === size.name ? main_color : '#333',
                                }}
                            >
                                {size.name.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* --- Order Form --- */}
            <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-4 bg-white p-6 rounded-lg shadow-sm"
            >
                <h3 className="text-lg font-medium text-gray-900">
                    {t.header}
                </h3>

                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t.nameLabel}
                    </label>
                    <div className="relative">
                        <div className={`absolute inset-y-0 ${isAr ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                            <User size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className={`w-full rounded-md border border-gray-300 py-2 ${isAr ? 'pr-10 pl-3' : 'pl-10 pr-3'} focus:outline-none`}
                            style={{
                                outlineColor: main_color,
                                boxShadow: `0 0 0 2px ${secondColor}`,
                            }}
                            placeholder={t.namePlaceholder}
                        />
                    </div>
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        {t.phoneLabel}
                    </label>
                    <div className="relative">
                        <div className={`absolute inset-y-0 ${isAr ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                            <Phone size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className={`w-full rounded-md border border-gray-300 py-2 ${isAr ? 'pr-10 pl-3' : 'pl-10 pr-3'} focus:outline-none`}
                            style={{
                                outlineColor: main_color,
                                boxShadow: `0 0 0 2px ${secondColor}`,
                            }}
                            placeholder={t.phonePlaceholder}
                        />
                    </div>
                </div>

                {/* State + City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            {t.stateLabel}
                        </label>
                        <select
                            id="state"
                            name="state"
                            value={states.find(s => s.name === formData.state)?.code || ''}
                            onChange={handleStateChange}
                            required
                            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none"
                            style={{
                                outlineColor: main_color,
                                boxShadow: `0 0 0 2px ${secondColor}`,
                            }}
                        >
                            <option value="">{t.statePlaceholder}</option>
                            {states.map((state) => (
                                <option key={state.code} value={state.code}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            {t.cityLabel}
                        </label>
                        <select
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            disabled={!formData.state}
                            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none"
                            style={{
                                outlineColor: main_color,
                                boxShadow: `0 0 0 2px ${secondColor}`,
                            }}
                        >
                            <option value="">{t.cityPlaceholder}</option>
                            {formData.state &&
                                city.map((o, idx) => (
                                    <option key={idx} value={o.name}>
                                        {o.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                {/* Quantity */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.quantityLabel}
                    </label>
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={decreaseQuantity}
                            className={`w-10 h-10 flex items-center justify-center border border-gray-300 bg-gray-100 ${isAr ? 'rounded-r-md' : 'rounded-l-md'}`}
                        >
                            -
                        </button>
                        <div className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-300">
                            {formData.quantity}
                        </div>
                        <button
                            type="button"
                            onClick={increaseQuantity}
                            className={`w-10 h-10 flex items-center justify-center border border-gray-300 bg-gray-100 ${isAr ? 'rounded-l-md' : 'rounded-r-md'}`}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Price Summary */}
                <div className="mt-4 space-y-1 text-sm text-gray-700">
                    <div className="flex justify-between">
                        <span>{t.productPrice}:</span>
                        <span>{t.currency} {product.price}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>{t.deliveryFee}:</span>
                        <span>{t.currency} {formData.ride}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-gray-900">
                        <span>{t.total}:</span>
                        <span style={{ color: main_color }}>
                            {t.currency} {formData.quantity * product.price + (formData.ride || 0)}
                        </span>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="mt-4 w-full text-white py-3 px-4 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: main_color }}
                >
                    <ShoppingCart size={20} className={isAr ? "ml-2" : "mr-2"} />
                    {t.submitButton}
                </button>
            </form>
        </div>
    )
}

export default ItemForm