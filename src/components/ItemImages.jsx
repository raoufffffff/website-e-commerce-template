import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState, Suspense } from "react";
import { PhotoSlider } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';

const ItemImages = ({ product, main_color }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const [index, setIndex] = useState(0);

    const nextImage = () =>
        setCurrentImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );

    const prevImage = () =>
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );

    const handleImageClick = useCallback((i) => {
        setIndex(i);
        setVisible(true);
    }, []);

    return (
        <div className="sticky top-24">
            {/* Main Image */}
            <div className="w-full mx-auto h-[60vh] relative md:h-[400px] md:max-h-[400px]">
                <img
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg cursor-zoom-in transition duration-300 hover:scale-[1.02]"
                    onClick={() => handleImageClick(currentImageIndex)}
                />
                {product.images.length > 1 && (
                    <>
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
                    </>
                )}
            </div>

            {/* Thumbnails */}
            <div className="flex w-full overflow-y-hidden overflow-x-auto mt-4">
                {product.images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`aspect-square max-w-[110px] min-w-[110px] mx-1 overflow-hidden rounded-md border-2 transition ${currentImageIndex === i ? "scale-105" : "hover:opacity-80"
                            }`}
                        style={
                            currentImageIndex === i
                                ? { borderColor: main_color }
                                : { borderColor: "transparent" }
                        }
                    >
                        <img
                            src={img}
                            alt={`Thumbnail ${i + 1}`}
                            className="w-full h-full object-cover"
                            onClick={() => handleImageClick(i)} // Optional: open modal on thumbnail click
                        />
                    </button>
                ))}
            </div>

            {/* Modal / Lightbox */}
            <Suspense fallback={null}>
                {visible && (
                    <PhotoSlider
                        images={product.images.map((src) => ({ src, key: src }))}
                        visible={visible}
                        onClose={() => setVisible(false)}
                        index={index}
                        onIndexChange={setIndex}
                    />
                )}
            </Suspense>
        </div>
    );
};

export default ItemImages;
