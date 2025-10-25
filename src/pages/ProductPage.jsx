import React, { useState, useCallback, useEffect, Suspense } from "react";
import item from "../item.json";
import states from "../constans/states.json";
import citie from "../constans/etat";

import {
    ChevronLeft,
    ChevronRight,
    User,
    Phone,
    ShoppingCart,
    CheckCircle,
    Minus,
    Plus,
    Loader2,
    MapPin,
    Building,
    XCircle // Added for the new lightbox
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import getData from "../getData";
import axios from "axios";

// --- Mock Data (to make this file runnable) ---
// In your real app, this would come from your API, JSON files, or props.




// --- End Mock Data ---


// --- New SimpleLightbox Component ---
// This replaces the external 'react-photo-view' library
const SimpleLightbox = ({ images, startIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(startIndex);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                showNext();
            } else if (e.key === 'ArrowLeft') {
                showPrev();
            } else if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        // Cleanup
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []); // Empty dependency array means this effect runs once on mount

    const showNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const showPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    // Stop clicks inside the image from closing the modal
    const handleImageClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 z-[50000] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                className="absolute top-4 right-4 text-white/70 transition hover:text-white"
                onClick={onClose}
                aria-label="Close lightbox"
            >
                <XCircle size={32} />
            </button>

            {/* Main Image */}
            <div className="relative flex items-center justify-center w-full h-full p-4 md:p-12">
                <img
                    src={images[currentIndex]}
                    alt={`Lightbox view ${currentIndex + 1}`}
                    className="max-w-full max-h-full h-auto w-auto object-contain"
                    onClick={handleImageClick}
                />
            </div>

            {/* Prev Button */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow-md backdrop-blur-sm transition hover:bg-white"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent modal close
                    showPrev();
                }}
                aria-label="Previous image"
            >
                <ChevronLeft size={28} className="text-gray-900" />
            </button>

            {/* Next Button */}
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow-md backdrop-blur-sm transition hover:bg-white"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent modal close
                    showNext();
                }}
                aria-label="Next image"
            >
                <ChevronRight size={28} className="text-gray-900" />
            </button>
        </div>
    );
};


// --- Helper Components ---



const SuccessMessage = ({ main_color, productName }) => (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-white p-8 rounded-lg shadow-lg text-center">
        <CheckCircle size={64} style={{ color: main_color }} />
        <h2 className="mt-6 text-2xl font-semibold text-gray-900">Order Successful!</h2>
        <p className="mt-2 text-gray-600">
            Thank you for your purchase. Your order for {productName} has been received.
        </p>
        <button
            onClick={() => window.location.reload()} // Simple refresh for demo
            className="mt-8 px-6 py-2 text-white font-medium rounded-lg shadow transition-transform hover:scale-105"
            style={{ backgroundColor: main_color }}
        >
            Place Another Order
        </button>
    </div>
);


// --- Main Product Page Component ---

export default function ProductPage() {
    // --- State Initialization ---
    const { id } = useParams(); // Assuming you're using react-router for routing
    const product = item.find(p => p._id === id); // Fetch product based on ID from URL
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigation = useNavigate()

    // Gallery State
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);

    // Variant State
    const colorOptions = product?.Variants?.find((v) => v.type === 'color')?.options || [];
    const sizeOptions = product?.Variants?.find((v) => v.type === 'size')?.options || [];
    const [selectedColor, setSelectedColor] = useState(colorOptions[0]?.name || '');
    const [selectedSize, setSelectedSize] = useState(sizeOptions[0]?.name || '');

    // Form State
    const [availableCities, setAvailableCities] = useState([]);
    const [formData, setFormData] = useState({
        userId: 'demo-user-123', // Hardcoded for demo
        name: '',
        ride: 0,
        phone: '',
        state: '',
        city: '',
        quantity: 1,
        color: '',
        size: '',
        item: null,
        price: 0
    });

    // --- Data Loading Effect ---


    // Update form when selections change
    useEffect(() => {
        setFormData(prev => ({ ...prev, color: selectedColor, size: selectedSize }));
    }, [selectedColor, selectedSize]);


    // --- Event Handlers ---

    // Gallery Handlers
    const nextImage = () => {
        if (!product) return;
        setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        if (!product) return;
        setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    };

    const handleImageClick = useCallback((i) => {
        setCurrentLightboxIndex(i);
        setIsLightboxOpen(true);
    }, []);

    // Form Handlers
    const decreaseQuantity = () => {
        setFormData((prev) => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }));
    };

    const increaseQuantity = () => {
        setFormData((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleStateChange = (e) => {
        const { value: stateCode } = e.target;
        const state = states.find(s => s.code === stateCode);
        const cities = citie.filter(c => c.state_code === stateCode);

        setAvailableCities(cities);
        setFormData({
            ...formData,
            state: state?.name || '',
            city: '', // Reset city
            ride: state?.prix_initial || 0,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        console.log("Submitting order:", formData);
        try {
            await axios.post(`https://true-fit-dz-api.vercel.app/order`, { ...formData, item: product, userId: product.userId, price: product.price });
            navigation('/thanks');
        } catch (error) {
            console.error(error);
        }

    };

    // --- Render Logic ---



    if (!product) {
        return <div className="p-10 text-center text-red-500">❌ Product not found</div>;
    }

    // Colors from mock data
    const { main_color, secondColor } = getData;

    return (
        <div className="min-h-screen bg-gray-50 font-inter antialiased">
            <main className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

                    {/* --- 1. Image Gallery --- */}
                    <div className="md:sticky md:top-8 h-max">
                        {/* Main Image */}
                        <div className="relative aspect-square w-full overflow-hidden rounded-xl shadow-sm">
                            <img
                                src={product.images[currentImageIndex]}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-xl cursor-zoom-in transition-transform duration-300 hover:scale-105"
                                onClick={() => handleImageClick(currentImageIndex)}
                            />
                            {product.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md backdrop-blur-sm transition hover:bg-white"
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft size={24} className="text-gray-700" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md backdrop-blur-sm transition hover:bg-white"
                                        aria-label="Next image"
                                    >
                                        <ChevronRight size={24} className="text-gray-700" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentImageIndex(i)}
                                        className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-lg border-2 transition-all duration-200
                                            ${currentImageIndex === i ? 'ring-2 ring-offset-2' : 'hover:opacity-80'}
                                        `}
                                        style={{
                                            borderColor: currentImageIndex === i ? main_color : '#E5E7EB', // gray-200
                                            ringColor: main_color,
                                        }}
                                    >
                                        <img
                                            src={img}
                                            alt={`Thumbnail ${i + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Lightbox */}
                        <Suspense fallback={null}>
                            {isLightboxOpen && (
                                <SimpleLightbox
                                    images={product.images}
                                    startIndex={currentLightboxIndex}
                                    onClose={() => setIsLightboxOpen(false)}
                                />
                            )}
                        </Suspense>
                        {product.LadingPages && (
                            <div className="mt-6">
                                {product.LadingPages.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`${product.name} Lading Page ${index + 1}`}
                                        className="w-full h-auto object-cover rounded-xl mb-4"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* --- 2. Details & Form --- */}
                    <div className="flex flex-col space-y-6">
                        {/* Product Info */}
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
                            <p className="text-3xl font-bold mt-2" style={{ color: main_color }}>
                                DA {product.price.toLocaleString()}
                            </p>
                            <p className="text-gray-600 mt-4 text-base leading-relaxed">{product.ShortDescription}</p>
                        </div>

                        {/* Variant Selectors */}
                        {colorOptions.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Color: <span className="font-semibold">{selectedColor}</span></h3>
                                <div className="flex flex-wrap gap-3 mt-3">
                                    {colorOptions.map((color) => (
                                        <button
                                            key={color.name}
                                            type="button"
                                            onClick={() => setSelectedColor(color.name)}
                                            className="w-8 h-8 rounded-full transition-all duration-200"
                                            style={{
                                                backgroundColor: color.color,
                                                outline: selectedColor === color.name
                                                    ? `2px solid ${main_color}`
                                                    : `1px solid ${color.color === '#FFFFFF' ? '#CCCCCC' : 'transparent'}`,
                                                outlineOffset: '2px',
                                            }}
                                            aria-label={color.name}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {sizeOptions.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Size: <span className="font-semibold">{selectedSize}</span></h3>
                                <div className="flex flex-wrap gap-3 mt-3">
                                    {sizeOptions.map((size) => (
                                        <button
                                            key={size.name}
                                            type="button"
                                            onClick={() => setSelectedSize(size.name)}
                                            className="w-12 h-10 flex items-center justify-center rounded-md border text-sm font-medium transition-all duration-200"
                                            style={{
                                                borderColor: selectedSize === size.name ? main_color : '#D1D5DB', // gray-300
                                                backgroundColor: selectedSize === size.name ? secondColor : 'white',
                                                color: selectedSize === size.name ? main_color : '#374151', // gray-700
                                                boxShadow: selectedSize === size.name ? `0 0 0 2px ${secondColor}` : 'none'
                                            }}
                                        >
                                            {size.name.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Order Form */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Complete Your Order
                                </h3>

                                {/* Shipping Details Section */}
                                <fieldset className="space-y-4">
                                    <legend className="text-sm font-medium text-gray-700 mb-2">Shipping Details</legend>

                                    {/* Name */}
                                    <div className="relative">
                                        <label htmlFor="name" className="sr-only">Full Name</label>
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User size={18} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text" id="name" name="name"
                                            value={formData.name} onChange={handleInputChange}
                                            required
                                            className="pl-10 w-full rounded-md  py-2.5 px-3    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition border border-gray-300"
                                            placeholder="Your Full Name"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className="relative">
                                        <label htmlFor="phone" className="sr-only">Phone Number</label>
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone size={18} className="text-gray-400" />
                                        </div>
                                        <input
                                            type="tel" id="phone" name="phone"
                                            value={formData.phone} onChange={handleInputChange}
                                            required
                                            className="pl-10 w-full rounded-md border border-gray-300 py-2.5 px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                            placeholder="Your Phone Number"
                                        />
                                    </div>

                                    {/* State + City */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <label htmlFor="state" className="sr-only">State</label>
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <MapPin size={18} className="text-gray-400" />
                                            </div>
                                            <select
                                                id="state" name="state"
                                                value={states.find(s => s.name === formData.state)?.code || ''}
                                                onChange={handleStateChange}
                                                required
                                                className="pl-10 w-full rounded-md  py-2.5 px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition appearance-none border border-gray-300"
                                            >
                                                <option value="">Select a state</option>
                                                {states.map((state) => (
                                                    <option key={state.code} value={state.code}>
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="relative">
                                            <label htmlFor="city" className="sr-only">City</label>
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Building size={18} className="text-gray-400" />
                                            </div>
                                            <select
                                                id="city" name="city"
                                                value={formData.city} onChange={handleInputChange}
                                                required
                                                disabled={!formData.state}
                                                className="pl-10 w-full rounded-md  py-2.5 px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed border border-gray-300"
                                            >
                                                <option value="">Select a city</option>
                                                {availableCities.map((o) => (
                                                    <option key={o.name} value={o.name}>
                                                        {o.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </fieldset>

                                {/* Order Details Section */}
                                <fieldset className="space-y-4">
                                    <legend className="text-sm font-medium text-gray-700">Order Details</legend>

                                    {/* Quantity */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Quantity
                                        </label>
                                        <div className="flex items-center">
                                            <button
                                                type="button" onClick={decreaseQuantity}
                                                className="w-10 h-10 flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 transition hover:bg-gray-100 active:bg-gray-200"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <div className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-300 font-medium">
                                                {formData.quantity}
                                            </div>
                                            <button
                                                type="button" onClick={increaseQuantity}
                                                className="w-10 h-10 flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 transition hover:bg-gray-100 active:bg-gray-200"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price Summary */}
                                    <div className="!mt-6 space-y-2 border-t pt-4">
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Subtotal:</span>
                                            <span className="font-medium">DA {(formData.quantity * product.price).toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Delivery Fee:</span>
                                            <span className="font-medium">DA {formData.ride.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between font-semibold text-lg text-gray-900">
                                            <span>Total:</span>
                                            <span style={{ color: main_color }}>
                                                DA {(formData.quantity * product.price + (formData.ride || 0)).toLocaleString()}
                                            </span>
                                        </div>
                                    </div>
                                </fieldset>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full text-white py-3 px-4 rounded-lg flex items-center justify-center text-base font-medium shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                    style={{
                                        backgroundColor: main_color,
                                        boxShadow: `0 4px 14px 0 ${secondColor}`
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={20} className="mr-2 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart size={20} className="mr-2" />
                                            Complete Order
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


