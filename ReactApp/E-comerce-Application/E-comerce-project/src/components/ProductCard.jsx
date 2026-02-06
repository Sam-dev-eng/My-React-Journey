import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiShoppingCart, FiHeart, FiEye, FiStar } from "react-icons/fi";
import { addToCart, openCart } from "../store/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        brand: product.brand,
      }),
    );
    dispatch(openCart());
  };

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-100">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-orange-500 hover:text-white transition-colors">
            <FiHeart className="w-4 h-4" />
          </button>
          <Link
            to={`/product/${product.id}`}
            className="p-2 bg-white rounded-full shadow-md hover:bg-orange-500 hover:text-white transition-colors"
          >
            <FiEye className="w-4 h-4" />
          </Link>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-orange-500 text-white py-3 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-orange-600"
        >
          <FiShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.brand}
          </p>
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-orange-500 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FiStar
                key={index}
                className={`w-3 h-3 ${
                  index < Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-orange-500">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
