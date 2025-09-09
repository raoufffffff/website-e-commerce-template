import React, { useState } from 'react';
import { ShoppingCart, Truck, RotateCcw, Shield, Star, ChevronLeft, ChevronRight, MapPin, User, Phone } from 'lucide-react';

const ProductPage = () => {
    const [selectedColor, setSelectedColor] = useState('black');
    const [selectedSize, setSelectedSize] = useState('m');
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        state: '',
        city: '',
        quantity: 1
    });

    // Algerian states and their cities
    const algerianStates = {
        'Adrar': ['Adrar', 'Timimoun', 'Aoulef'],
        'Chlef': ['Chlef', 'Ténès', 'El Karimia'],
        'Laghouat': ['Laghouat', 'Ksar El Hirane', 'Aflou'],
        'Oum El Bouaghi': ['Oum El Bouaghi', 'Aïn Babouche', 'Aïn Beïda'],
        'Batna': ['Batna', 'Merouana', 'Tazoult'],
        'Béjaïa': ['Béjaïa', 'Amizour', 'Sidi Aïch'],
        'Biskra': ['Biskra', 'Sidi Okba', 'El Kantara'],
        'Béchar': ['Béchar', 'Kenadsa', 'Abadla'],
        'Blida': ['Blida', 'Boufarik', 'Bouïnane'],
        'Bouira': ['Bouira', 'Sour El Ghozlane', 'Lakhdaria'],
        'Tamanrasset': ['Tamanrasset', 'In Salah', 'In Guezam'],
        'Tébessa': ['Tébessa', 'Bir El Ater', 'El Kouif'],
        'Tlemcen': ['Tlemcen', 'Hennaya', 'Remchi'],
        'Tiaret': ['Tiaret', 'Mahdia', 'Aïn Deheb'],
        'Tizi Ouzou': ['Tizi Ouzou', 'Azazga', 'Michelet'],
        'Algiers': ['Algiers', 'Dellys', 'Bouzareah'],
        'Djelfa': ['Djelfa', 'Aïn Oussera', 'Hassi Bahbah'],
        'Jijel': ['Jijel', 'Taher', 'El Ancer'],
        'Sétif': ['Sétif', 'El Eulma', 'Aïn Arnat'],
        'Saïda': ['Saïda', 'Youb', 'Aïn El Hadjar'],
        'Skikda': ['Skikda', 'Azzaba', 'El Harrouch'],
        'Sidi Bel Abbès': ['Sidi Bel Abbès', 'Tessala', 'Sfisef'],
        'Annaba': ['Annaba', 'El Bouni', 'El Hadjar'],
        'Guelma': ['Guelma', 'Héliopolis', 'Aïn Makhlouf'],
        'Constantine': ['Constantine', 'El Khroub', 'Aïn Abid'],
        'Médéa': ['Médéa', 'Berrouaghia', 'Ksar El Boukhari'],
        'Mostaganem': ['Mostaganem', 'Mesra', 'Aïn Nouïssy'],
        'M\'Sila': ['M\'Sila', 'Bou Saâda', 'Maadid'],
        'Mascara': ['Mascara', 'Mohammedia', 'Sig'],
        'Ouargla': ['Ouargla', 'Hassi Messaoud', 'N\'Goussa'],
        'Oran': ['Oran', 'Bir El Djir', 'Aïn El Turk'],
        'El Bayadh': ['El Bayadh', 'Rogassa', 'Brezina'],
        'Illizi': ['Illizi', 'Djanet', 'In Amenas'],
        'Bordj Bou Arréridj': ['Bordj Bou Arréridj', 'Ras El Oued', 'Mansoura'],
        'Boumerdès': ['Boumerdès', 'Thenia', 'Corso'],
        'El Tarf': ['El Tarf', 'Bouhadjar', 'Ben M\'Hidi'],
        'Tindouf': ['Tindouf', 'Oum El Assel'],
        'Tissemsilt': ['Tissemsilt', 'Theniet El Had', 'Lazharia'],
        'El Oued': ['El Oued', 'Debila', 'Hassi Khalifa'],
        'Khenchela': ['Khenchela', 'Kais', 'Babar'],
        'Souk Ahras': ['Souk Ahras', 'Sedrata', 'M\'Daourouch'],
        'Tipaza': ['Tipaza', 'Cherchell', 'Hadjout'],
        'Mila': ['Mila', 'Ferdjioua', 'Tadjenanet'],
        'Aïn Defla': ['Aïn Defla', 'Khemis Miliana', 'Bordj El Emir Abdelkader'],
        'Naâma': ['Naâma', 'Mécheria', 'Aïn Sefra'],
        'Aïn Témouchent': ['Aïn Témouchent', 'Hammam Bouhdjar', 'Bou Zedjar'],
        'Ghardaïa': ['Ghardaïa', 'Metlili', 'El Menea'],
        'Relizane': ['Relizane', 'Oued Rhiou', 'Zemmoura']
    };

    const product = {
        name: "Ensemble Prestige Short",
        price: 89.99,
        description: "Elevate your style with our premium Prestige Shorts. Crafted with meticulous attention to detail, these shorts combine comfort and sophistication for the modern individual who values both fashion and function.",
        colors: [
            { name: 'black', value: 'bg-gray-900' },
            { name: 'navy blue', value: 'bg-blue-900' },
            { name: 'olive green', value: 'bg-green-800' }
        ],
        sizes: ['s', 'm', 'l', 'xl'],
        images: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80",
            "https://images.unsplash.com/photo-1588117305388-c2631a279f82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80",
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80",
            "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80"
        ],
        features: [
            { icon: Truck, text: "Free Shipping on orders over $100" },
            { icon: RotateCcw, text: "30-Day Returns if you change your mind" },
            { icon: Shield, text: "Secure Checkout with multiple payment options" }
        ],
        reviews: [
            { name: "Michael Johnson", rating: 5, text: "These shorts are incredibly comfortable and stylish. The material is high quality and they fit perfectly. I've received numerous compliments already!" },
            { name: "Sarah Williams", rating: 5, text: "I bought these for my husband and he loves them. The fabric is breathable and perfect for summer. The sizing was accurate and the quality is exceptional for the price." }
        ]
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
        );
    };

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
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would process the form data here
        alert(`Order received!\nName: ${formData.name}\nPhone: ${formData.phone}\nState: ${formData.state}\nCity: ${formData.city}\nQuantity: ${formData.quantity}`);
    };

    return (
        <div className="min-h-screen relative bg-gray-50">
            {/* Header */}


            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Gallery */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <img
                                src={product.images[currentImageIndex]}
                                alt={product.name}
                                className="w-full h-full object-cover"
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
                            <div className="grid grid-cols-4 gap-2 mt-4">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`aspect-square overflow-hidden rounded-md ${currentImageIndex === index ? 'ring-2 ring-amber-600' : ''}`}
                                    >
                                        <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Details and Form */}
                    <div className="lg:col-span-1">
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <p className="text-2xl font-bold text-amber-600 mt-2">${product.price}</p>
                        <p className="text-gray-600 mt-4">{product.description}</p>

                        {/* Color Selector */}
                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-900">Color</h3>
                            <div className="flex space-x-3 mt-2">
                                {product.colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-8 h-8 rounded-full ${color.value} ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-amber-600' : ''}`}
                                        aria-label={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-900">Size</h3>
                            <div className="flex space-x-3 mt-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-10 h-10 flex items-center justify-center rounded-md border ${selectedSize === size ? 'border-amber-600 bg-amber-50 text-amber-600' : 'border-gray-300 text-gray-700'}`}
                                    >
                                        {size.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Order Form */}
                        <form onSubmit={handleSubmit} className="mt-8 space-y-4 bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-lg font-medium text-gray-900">Complete Your Order</h3>

                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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
                                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="Your full name"
                                    />
                                </div>
                            </div>

                            {/* Phone Input */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
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
                                        className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="Your phone number"
                                    />
                                </div>
                            </div>

                            {/* State and City Selectors */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                        State
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin size={18} className="text-gray-400" />
                                        </div>
                                        <select
                                            id="state"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                            className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                        >
                                            <option value="">Select a state</option>
                                            {Object.keys(algerianStates).map((state) => (
                                                <option key={state} value={state}>{state}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                        City
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin size={18} className="text-gray-400" />
                                        </div>
                                        <select
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            disabled={!formData.state}
                                            className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                        >
                                            <option value="">Select a city</option>
                                            {formData.state && algerianStates[formData.state].map((city) => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity Selector */}
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

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="mt-4 w-full bg-amber-600 text-white py-3 px-4 rounded-md hover:bg-amber-700 flex items-center justify-center"
                            >
                                <ShoppingCart size={20} className="mr-2" />
                                Complete Order
                            </button>
                        </form>

                        {/* Product Features */}
                        <div className="mt-8 space-y-4">
                            {product.features.map((feature, index) => (
                                <div key={index} className="flex items-center">
                                    <feature.icon size={20} className="text-amber-600 mr-3" />
                                    <span className="text-gray-700">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
                    <div className="space-y-6">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-medium text-gray-900">{review.name}</h3>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={16}
                                                className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600">{review.text}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}

        </div>
    );
};

export default ProductPage;