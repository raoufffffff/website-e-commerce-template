import { Star, Heart, ShoppingCart, Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ItemCard = ({ product, main_color }) => {
    return (
        <Link
            to={`/Product/${product._id}`}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="relative">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-60 object-cover"
                />
                {(product.isNew || product.isSale) && (
                    <div className="absolute top-3 left-3">

                        <span className="bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-md mr-2">New</span>

                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>

                <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">DA {product.price}</span>
                    <button
                        style={{
                            backgroundColor: main_color
                        }}
                        className=" text-white p-2 rounded-lg  transition-colors">
                        <ShoppingCart size={16} />
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default ItemCard