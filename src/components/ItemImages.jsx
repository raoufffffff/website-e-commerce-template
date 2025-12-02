import { useRef, useState, useCallback, Suspense } from 'react';
import { PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const ItemImages = ({ product, main_color, language }) => {
    const scrollRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [index, setIndex] = useState(0);

    // Safety check for images
    const images = product?.images || [];

    // Scroll to image based on thumbnail click
    const scrollToImage = useCallback((idx) => {
        if (!scrollRef.current) return;
        // Calculate position based on container width * index
        const scrollX = scrollRef.current.clientWidth * idx;
        if (language == "ar") {
            scrollRef.current.scrollTo({ left: -scrollX, behavior: 'smooth' });
            return;
        }
        scrollRef.current.scrollTo({ left: scrollX, behavior: 'smooth' });
    }, []);

    const handleImageClick = useCallback((i) => {
        setIndex(i);
        setVisible(true);
    }, []);

    const handleThumbClick = useCallback((i) => {
        setIndex(i);
        scrollToImage(i);
    }, [scrollToImage]);

    if (!product) return null;

    return (
        <div className="md:sticky md:top-8 h-max w-full flex flex-col gap-4">

            {/* Main Image Viewer (Carousel Style) */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth rounded-2xl border border-gray-100 shadow-sm hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide scrollbar for Firefox/IE
            >
                {images.map((src, i) => (
                    <div
                        key={i}
                        className="min-w-full snap-center flex justify-center items-center bg-white"
                    >
                        <img
                            src={src}
                            alt={`${product.name} - View ${i + 1}`}
                            loading="lazy"
                            onClick={() => handleImageClick(i)}
                            className="w-full h-auto max-h-[500px] object-contain cursor-zoom-in transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                ))}
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
                <div
                    className="flex overflow-x-auto gap-3 px-1 py-2"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {images.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => handleThumbClick(i)}
                            className={`min-w-[70px] max-w-[80px] h-20 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${i === index ? 'ring-2 ring-offset-1' : 'opacity-80 hover:opacity-100'
                                }`}
                            style={{
                                borderColor: i === index ? main_color : 'transparent',
                                ringColor: main_color,
                            }}
                        >
                            <img
                                src={src}
                                alt={`Thumbnail ${i + 1}`}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox (Full Screen) */}
            <Suspense fallback={null}>
                <PhotoSlider
                    images={images.map((src) => ({ src, key: src }))}
                    visible={visible}
                    onClose={() => setVisible(false)}
                    index={index}
                    onIndexChange={setIndex}
                    // Optional: Custom overlay colors if needed
                    overlayRender={(props) => (
                        <div className="absolute bottom-5 left-0 w-full text-center pointer-events-none">
                            <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                {props.index + 1} / {images.length}
                            </span>
                        </div>
                    )}
                />
            </Suspense>

            {/* Landing Pages / Extra Images */}
            {product.LadingPages && product.LadingPages.length > 0 && (
                <div className="mt-6 flex flex-col gap-4">
                    {product.LadingPages.map((img, idx) => (
                        <img
                            key={`lp-${idx}`}
                            src={img}
                            alt={`${product.name} Detail ${idx + 1}`}
                            className="w-full h-auto object-cover rounded-xl shadow-sm"
                            loading="lazy"
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ItemImages;