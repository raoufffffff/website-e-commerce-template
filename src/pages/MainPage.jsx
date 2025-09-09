import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Search, ChevronRight } from 'lucide-react';

const MainPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('featured');
    const products = [
        {
            id: 1,
            name: "Ensemble Prestige Short",
            price: 89.99,
            category: "shorts",
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80",
            rating: 4.8,
            isNew: true,
            isSale: false
        },
        {
            id: 2,
            name: "Premium Cotton T-Shirt",
            price: 39.99,
            category: "t-shirts",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
            rating: 4.5,
            isNew: false,
            isSale: true
        },
        {
            id: 3,
            name: "Classic Urban Hoodie",
            price: 69.99,
            category: "hoodies",
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
            rating: 4.7,
            isNew: true,
            isSale: false
        },
        {
            id: 4,
            name: "Slim Fit Jeans",
            price: 79.99,
            category: "pants",
            image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
            rating: 4.3,
            isNew: false,
            isSale: true
        },
        {
            id: 5,
            name: "Leather Crossbody Bag",
            price: 129.99,
            category: "accessories",
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
            rating: 4.9,
            isNew: true,
            isSale: false
        },
        {
            id: 6,
            name: "Athletic Shorts",
            price: 49.99,
            category: "shorts",
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80",
            rating: 4.6,
            isNew: false,
            isSale: true
        },
        {
            id: 7,
            name: "Oversized Sweatshirt",
            price: 64.99,
            category: "hoodies",
            image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
            rating: 4.4,
            isNew: true,
            isSale: false
        },
        {
            id: 8,
            name: "Baseball Cap",
            price: 29.99,
            category: "accessories",
            image: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
            rating: 4.2,
            isNew: false,
            isSale: true
        }
    ];
    // Categories data with images
    const categories = [
        {
            id: 'all',
            name: 'All Products',
            image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80'
        },
        {
            id: 'shorts',
            name: 'Shorts',
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80'
        },
        {
            id: 't-shirts',
            name: 'T-Shirts',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80'
        },
        {
            id: 'hoodies',
            name: 'Hoodies',
            image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80'
        },
        {
            id: 'pants',
            name: 'Pants',
            image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80'
        },
        {
            id: 'accessories',
            name: 'Accessories',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80'
        },
        {
            id: 'new',
            name: 'New Arrivals',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        {
            id: 'sale',
            name: 'Sale',
            image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        }
    ];

    // Products data (same as before)


    // Filter products based on selected category
    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);

    // Sort products based on selection
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return a.id - b.id; // Default sort (featured)
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header (same as before) */}


            <main className="container mx-auto px-4 py-8">
                {/* Hero Section (same as before) */}


                {/* Updated Categories Section with Images */}
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
                        <button className="text-amber-600 flex items-center hover:text-amber-700">
                            View all <ChevronRight size={16} className="ml-1" />
                        </button>
                    </div>

                    <div className="flex overflow-x-auto gap-4">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`group min-w-[70%] sm:min-w-[50%] md:min-w-[30%] lg:min-w-[20%] relative overflow-hidden rounded-xl transition-all ${selectedCategory === category.id
                                    ? 'ring-2 ring-amber-500 ring-offset-2'
                                    : 'hover:ring-1 hover:ring-amber-300'
                                    }`}
                            >
                                <div className="aspect-square overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 group-hover:bg-opacity-10 transition-opacity"></div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                                    <span className="text-white text-sm font-medium block text-center">{category.name}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Products Section (same as before) */}
                <section>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                            {selectedCategory === 'all' ? 'All Products' :
                                categories.find(c => c.id === selectedCategory)?.name}
                            <span className="text-gray-500 text-base font-normal ml-2">
                                ({filteredProducts.length} products)
                            </span>
                        </h2>

                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {sortedProducts.map(product => (
                            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-60 object-cover"
                                    />
                                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-amber-50">
                                        <Heart size={18} className="text-gray-600" />
                                    </button>
                                    {(product.isNew || product.isSale) && (
                                        <div className="absolute top-3 left-3">
                                            {product.isNew && (
                                                <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-md mr-2">New</span>
                                            )}
                                            {product.isSale && (
                                                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">Sale</span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                                    <div className="flex items-center mb-2">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={i < Math.floor(product.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-900">${product.price}</span>
                                        <button className="bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600 transition-colors">
                                            <ShoppingCart size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Newsletter Section (same as before) */}


            {/* Footer (same as before) */}

        </div>
    );
};

export default MainPage;