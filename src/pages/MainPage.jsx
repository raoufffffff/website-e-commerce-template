import { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from 'lucide-react';
import getData from '../getData';
import ItemCard from '../components/ItemCard';
import items from '../item.json';
import categories from '../categories.json';
import CategoryCard from '../components/CategoryCard';
import axios from 'axios';

const MainPage = () => {
    // 🟢 Safe destructuring
    const { main_color = '#000', id, language = 'fr' } = getData || {};

    const [selectedCategory, setSelectedCategory] = useState('all');
    const hasVisited = useRef(false);

    const isAr = language === "ar";

    // --- Translations ---
    const t = {
        shopByCategory: isAr ? "التسوق حسب الفئة" : "Acheter par catégorie",
        viewAll: isAr ? "عرض الكل" : "Voir tout",
        allProducts: isAr ? "جميع المنتجات" : "Tous les produits",
        productsCount: isAr ? "منتجات" : "produits",
    };

    useEffect(() => {
        if (hasVisited.current) return;
        hasVisited.current = true;

        const visit = async () => {
            try {
                // Ensure ID exists before sending
                if (id) {
                    await axios.put(`https://true-fit-dz-api.vercel.app/user/visit/${id}`, {
                        last_visit: new Date().toISOString(),
                        page: 'mainpage'
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        visit();
    }, [id]);

    // 🟢 Filter products based on selected category
    const filteredProducts = selectedCategory === 'all'
        ? items.filter(e => e.show)
        : items.filter(e => e.show).filter(product => product.type === selectedCategory);

    const changeCategory = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    return (
        <div className="min-h-screen bg-gray-50" dir={isAr ? "rtl" : "ltr"}>

            <main className="container mx-auto px-4 py-8">

                {/* 🟢 Categories Section */}
                {categories.filter(e => e.show).length > 0 && (
                    <section className="mb-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {t.shopByCategory}
                            </h2>
                            <button
                                onClick={() => setSelectedCategory('all')}
                                style={{ color: main_color }}
                                className="flex items-center font-medium hover:opacity-80 transition-opacity"
                            >
                                {t.viewAll}
                                {isAr ? <ChevronLeft size={16} className="mr-1" /> : <ChevronRight size={16} className="ml-1" />}
                            </button>
                        </div>

                        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                            {/* 'All' Card Option */}
                            <div
                                onClick={() => changeCategory('all')}
                                className={`flex-shrink-0 cursor-pointer p-4 rounded-xl border transition-all ${selectedCategory === 'all' ? 'border-2 shadow-md' : 'border-gray-200 bg-white'}`}
                                style={{ borderColor: selectedCategory === 'all' ? main_color : '' }}
                            >
                                <span className="font-semibold text-gray-700 whitespace-nowrap px-2">
                                    {t.viewAll}
                                </span>
                            </div>

                            {/* Dynamic Categories */}
                            {categories.filter(e => e.show).map((category, i) => (
                                <CategoryCard
                                    key={i}
                                    category={category}
                                    changeCategory={changeCategory}
                                    main_color={main_color}
                                    selectedCategory={selectedCategory}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* 🟢 Products Section */}
                <section>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                            {selectedCategory === 'all'
                                ? t.allProducts
                                : categories.find(c => c.name === selectedCategory)?.name || selectedCategory
                            }
                            <span className="text-gray-500 text-base font-normal mx-2">
                                ({filteredProducts.length} {t.productsCount})
                            </span>
                        </h2>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* 🔴 FIX: Map over filteredProducts, not items */}
                            {filteredProducts.map(product => (
                                <ItemCard
                                    key={product._id}
                                    language={language}
                                    main_color={main_color}
                                    product={product}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            No products found in this category.
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default MainPage;