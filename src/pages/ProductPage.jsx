import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
import items from '../item.json';
import getData from '../getData';
import ItemForm from '../components/ItemForm';

const ProductPage = () => {
    const { id } = useParams();
    const product = items.find((e) => e._id == id);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { main_color } = getData;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [id])

    if (!product) {
        return <div className="p-10 text-center text-red-500">❌ Product not found</div>;
    }



    const nextImage = () =>
        setCurrentImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );

    const prevImage = () =>
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );



    return (
        <div className="min-h-screen relative bg-gray-50">
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* --- Gallery --- */}
                    <div className="md:col-span-1">
                        <div className="sticky top-24">
                            <div className="w-full mx-auto h-[70%] relative md:h-[400px] md:max-h-[400px]">
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
                    <ItemForm product={product} />
                </div>
            </main>
        </div>
    );
};

export default ProductPage;
