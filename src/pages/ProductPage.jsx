import React, { useEffect, useState } from 'react';
import { ShoppingCart, ChevronLeft, ChevronRight, User, Phone } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import items from '../item.json';
import getData from '../getData';

const ProductPage = () => {
    const { id } = useParams();
    const { main_color, secondColor } = getData;
    const [selectedColor, setSelectedColor] = useState('black');
    const [selectedSize, setSelectedSize] = useState('m');
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        state: '',
        city: '',
        quantity: 1,
    });
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [id])
    const product = items.find((e) => e._id == id);

    if (!product) {
        return <div className="p-10 text-center text-red-500">❌ Product not found</div>;
    }

    const algerianStates = {
        Adrar: ['Adrar', 'Timimoun', 'Aoulef'],
        Chlef: ['Chlef', 'Ténès', 'El Karimia'],
        Relizane: ['Relizane', 'Oued Rhiou', 'Zemmoura'],
    };

    const nextImage = () =>
        setCurrentImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );

    const prevImage = () =>
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setFormData({ ...formData, quantity: quantity - 1 });
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
        setFormData({ ...formData, quantity: quantity + 1 });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(
            `Order received!\nName: ${formData.name}\nPhone: ${formData.phone}\nState: ${formData.state}\nCity: ${formData.city}\nQuantity: ${formData.quantity}`
        );
    };

    const colorOptions =
        product.Variants?.find((v) => v.type === 'color')?.options || [];
    const sizeOptions =
        product.Variants?.find((v) => v.type === 'size')?.options || [];

    return (
        <div className="min-h-screen relative bg-gray-50">
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* --- Gallery --- */}
                    <div className="md:col-span-1">
                        <div className="sticky top-24">
                            <div className="w-full mx-auto h-[70%] relative">
                                <img
                                    src={product.images[currentImageIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                            <div className="grid grid-cols-4 gap-2 mt-4">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`aspect-square overflow-hidden rounded-md ${currentImageIndex === index ? 'ring-2' : ''
                                            }`}
                                        style={currentImageIndex === index ? { ringColor: main_color, borderColor: main_color } : {}}
                                    >
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- Details & Form --- */}
                    <div className="md:col-span-1">
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <p className="text-2xl font-bold mt-2" style={{ color: main_color }}>
                            ${product.price}
                        </p>
                        <p className="text-gray-600 mt-4">{product.ShortDescription}</p>

                        {/* --- Color Selector --- */}
                        {colorOptions.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                                <div className="flex space-x-3 mt-2">
                                    {colorOptions.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className="w-8 h-8 rounded-full"
                                            style={{
                                                backgroundColor: color.color,
                                                border: selectedColor === color.name ? `2px solid ${main_color}` : '1px solid #ccc',
                                            }}
                                            aria-label={color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* --- Size Selector --- */}
                        {sizeOptions.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                <div className="flex space-x-3 mt-2">
                                    {sizeOptions.map((size) => (
                                        <button
                                            key={size.name}
                                            onClick={() => setSelectedSize(size.name)}
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
                                Complete Your Order
                            </h3>

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none"
                                        style={{
                                            outlineColor: main_color,
                                            boxShadow: `0 0 0 2px ${secondColor}`,
                                        }}
                                        placeholder="Your full name"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none"
                                        style={{
                                            outlineColor: main_color,
                                            boxShadow: `0 0 0 2px ${secondColor}`,
                                        }}
                                        placeholder="Your phone number"
                                    />
                                </div>
                            </div>

                            {/* State + City */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="state"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        State
                                    </label>
                                    <select
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none"
                                        style={{
                                            outlineColor: main_color,
                                            boxShadow: `0 0 0 2px ${secondColor}`,
                                        }}
                                    >
                                        <option value="">Select a state</option>
                                        {Object.keys(algerianStates).map((state) => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="city"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        City
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
                                        <option value="">Select a city</option>
                                        {formData.state &&
                                            algerianStates[formData.state].map((city) => (
                                                <option key={city} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Quantity
                                </label>
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        onClick={decreaseQuantity}
                                        className="w-10 h-10 flex items-center justify-center rounded-l-md border border-gray-300 bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <div className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-300">
                                        {quantity}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={increaseQuantity}
                                        className="w-10 h-10 flex items-center justify-center rounded-r-md border border-gray-300 bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <Link
                                to={"/thanks"}
                                className="mt-4 w-full text-white py-3 px-4 rounded-md flex items-center justify-center"
                                style={{ backgroundColor: main_color }}
                            >
                                <ShoppingCart size={20} className="mr-2" />
                                Complete Order
                            </Link>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductPage;
