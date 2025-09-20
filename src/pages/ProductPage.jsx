import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import items from '../item.json';
import getData from '../getData';
import ItemForm from '../components/ItemForm';
import ItemImages from '../components/ItemImages';
import ReactPixel from "react-facebook-pixel";
let pixelInitialized = false;

const ProductPage = () => {
    const { id } = useParams();
    const product = items.find((e) => e._id == id);

    const { main_color, facebookPixel } = getData;
    const buy = () => {
        if (facebookPixel?.id) {
            // Always track page view
            ReactPixel.pageView();

            // Track product view (ViewContent event)
            ReactPixel.track("ViewContent", {
                content_name: product.name,
                content_ids: [product._id],
                content_type: "product",
                value: product.price,
                currency: "DZD",
            });
        }
    }


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        if (facebookPixel.id && !pixelInitialized) {
            ReactPixel.init(facebookPixel.id, {}, { debug: false });
            pixelInitialized = true;
        }

        // Always track view
        if (facebookPixel.id) {
            ReactPixel.pageView();
            ReactPixel.track("ViewContent", {
                content_name: product.name,
                content_ids: [product._id],
                content_type: "product",
                value: product.price,
                currency: "DZD",
            });
        }
    }, [id])

    if (!product) {
        return <div className="p-10 text-center text-red-500">❌ Product not found</div>;
    }






    return (
        <div className="min-h-screen relative bg-gray-50">
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* --- Gallery --- */}
                    <div className="md:col-span-1">
                        <ItemImages main_color={main_color} product={product} />
                    </div>

                    {/* --- Details & Form --- */}
                    <ItemForm buy={buy} product={product} />
                </div>
            </main>
        </div>
    );
};

export default ProductPage;
