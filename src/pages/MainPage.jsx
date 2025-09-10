import React, { useState } from 'react';
import { Star, Heart, ShoppingCart, Search, ChevronRight } from 'lucide-react';
import getData from '../getData';
import Cat from '../container/Cat';
import items from '../item.json'
import categories from '../categories.json'
const MainPage = () => {
    const { main_color } = getData
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('featured');

    // Categories data with images


    // Products data (same as before)


    // Filter products based on selected category
    const filteredProducts = selectedCategory === 'all'
        ? items
        : items.filter(product => product.category === selectedCategory);

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
                {categories.length > 0 && <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
                        <button
                            style={{
                                color: main_color
                            }}
                            className=" flex items-center ">
                            View all <ChevronRight size={16} className="ml-1" />
                        </button>
                    </div>

                    <div className="flex overflow-x-auto gap-4">
                        {categories.filter(e => e.best).map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                style={{
                                    borderWidth: "2px",
                                    borderStyle: "solid",
                                    borderColor: selectedCategory === category.id ? main_color : "#fff0"
                                }}
                                className={`group min-w-[70%] sm:min-w-[50%] md:min-w-[30%] lg:min-w-[20%] relative overflow-hidden rounded-xl transition-all`}
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
                </section>}

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
                        {sortedProducts.filter(e => e.best).map(product => (
                            <Cat main_color={main_color} product={product} key={product.id} />
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