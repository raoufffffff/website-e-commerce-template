import { useCallback, useState, Suspense, useEffect } from "react";
import { PhotoSlider } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import {
    ChevronLeft,
    ChevronRight,
    XCircle // Added for the new lightbox
} from "lucide-react";
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

const ItemImages = ({ product, main_color }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);
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
    return (
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
    );
};

export default ItemImages;
