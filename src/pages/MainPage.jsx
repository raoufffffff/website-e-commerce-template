import { useEffect, useRef, useState } from "react";
import { ChevronRight } from 'lucide-react';
import getData from '../getData';
import ItemCard from '../components/ItemCard';
import items from '../item.json'
import categories from '../categories.json'
import CategoryCard from '../components/CategoryCard';
import axios from 'axios';
const MainPage = () => {
    const { main_color, id } = getData
    const [selectedCategory, setSelectedCategory] = useState('all');
    const hasVisited = useRef(false);

    useEffect(() => {

        if (hasVisited.current) return; // ✅ Prevent second execution
        hasVisited.current = true;

        const visit = async () => {
            try {
                await axios.put(`https://true-fit-dz-api.vercel.app/user/visit/${id}`, {
                    last_visit: new Date().toISOString(),
                    page: 'mainpage'
                });
            } catch (error) {
                console.log(error);
            }
        };

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        visit();
    }, []);

    // Categories data with images


    // Products data (same as before)


    // Filter products based on selected category
    const filteredProducts = selectedCategory === 'all'
        ? items.filter(e => e.show)
        : items.filter(e => e.show).filter(product => product.type === selectedCategory);

    // Sort products based on selection

    const changeCategory = (e) => {
        setSelectedCategory(e)
    }
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header (same as before) */}


            <main className="container mx-auto px-4 py-8">
                {/* Hero Section (same as before) */}


                {/* Updated Categories Section with Images */}
                {categories.filter(e => e.show).length > 0 && <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">التسوق حسب الفئة</h2>
                        <button
                            style={{
                                color: main_color
                            }}
                            className=" flex items-center ">
                            عرض الكل <ChevronRight size={16} className="ml-1" />
                        </button>
                    </div>

                    <div className="flex overflow-x-auto gap-4">
                        {categories.filter(e => e.show).map((category, i) => (
                            <CategoryCard
                                key={i}
                                category={category} changeCategory={changeCategory} main_color={main_color} selectedCategory={selectedCategory} />
                        ))}
                    </div>
                </section>}

                {/* Products Section (same as before) */}
                <section>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                            {selectedCategory === 'all' ? 'جميع المنتجات' :
                                categories.find(c => c.name === selectedCategory)?.name}
                            <span className="text-gray-500 text-base font-normal mx-2">
                                ({filteredProducts.length} منتجات)
                            </span>
                        </h2>


                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {items.map(product => (
                            <ItemCard main_color={main_color} product={product} key={product._id} />
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