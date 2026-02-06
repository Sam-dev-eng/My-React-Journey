import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "../store/api/productsApi";
import { addToCart, openCart } from "../store/slices/cartSlice";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiStar,
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiMinus,
  FiPlus,
  FiChevronRight,
} from "react-icons/fi";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const { data: relatedProducts } = useGetProductsQuery({
    limit: 4,
    category: product?.category,
  });

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          brand: product.brand,
        }),
      );
    }
    dispatch(openCart());
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  if (isLoading) return <Loading />;

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/shop"
            className="inline-block px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-gray-500 hover:text-orange-500 transition-colors"
            >
              Home
            </Link>
            <FiChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              to="/shop"
              className="text-gray-500 hover:text-orange-500 transition-colors"
            >
              Shop
            </Link>
            <FiChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              to={`/category/${product.category}`}
              className="text-gray-500 hover:text-orange-500 transition-colors capitalize"
            >
              {product.category}
            </Link>
            <FiChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate max-w-[200px]">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={product.images?.[selectedImage] || product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
                {product.discountPercentage > 0 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? "border-orange-500"
                          : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand & Title */}
              <div>
                <p className="text-sm text-orange-500 font-medium uppercase tracking-wide mb-1">
                  {product.brand}
                </p>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <FiStar
                        key={index}
                        className={`w-4 h-4 ${
                          index < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-orange-500">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    product.stock > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span
                  className={
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {product.stock > 0
                    ? `In Stock (${product.stock} available)`
                    : "Out of Stock"}
                </span>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={decreaseQuantity}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-8 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>

                {/* Wishlist Button */}
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <FiHeart className="w-5 h-5" />
                </button>

                {/* Share Button */}
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <FiShare2 className="w-5 h-5" />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <FiTruck className="w-6 h-6 mx-auto text-orange-500 mb-2" />
                  <p className="text-xs text-gray-600">Free Shipping</p>
                </div>
                <div className="text-center">
                  <FiShield className="w-6 h-6 mx-auto text-orange-500 mb-2" />
                  <p className="text-xs text-gray-600">Secure Payment</p>
                </div>
                <div className="text-center">
                  <FiRefreshCw className="w-6 h-6 mx-auto text-orange-500 mb-2" />
                  <p className="text-xs text-gray-600">Easy Returns</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-900">SKU:</span>{" "}
                  {product.sku || `SKU-${product.id}`}
                </p>
                <p>
                  <span className="font-medium text-gray-900">Category:</span>{" "}
                  <span className="capitalize">{product.category}</span>
                </p>
                <p>
                  <span className="font-medium text-gray-900">Tags:</span>{" "}
                  {product.tags?.join(", ") || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t">
            <div className="container mx-auto">
              {/* Tab Headers */}
              <div className="flex border-b">
                {["description", "reviews", "shipping"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? "text-orange-500 border-b-2 border-orange-500"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "description" && (
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Product Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Specifications
                        </h4>
                        <ul className="space-y-1 text-gray-600">
                          <li>• Brand: {product.brand}</li>
                          <li>
                            • Category:{" "}
                            <span className="capitalize">
                              {product.category}
                            </span>
                          </li>
                          <li>• Weight: {product.weight || "N/A"}g</li>
                          <li>
                            • Dimensions:{" "}
                            {product.dimensions
                              ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`
                              : "N/A"}
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Warranty
                        </h4>
                        <p className="text-gray-600">
                          {product.warrantyInformation ||
                            "1 Year Manufacturer Warranty"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Customer Reviews
                    </h3>
                    {product.reviews && product.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {product.reviews.map((review, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                  <span className="text-orange-500 font-medium">
                                    {review.reviewerName?.charAt(0) || "U"}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {review.reviewerName}
                                  </p>
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <FiStar
                                        key={i}
                                        className={`w-3 h-3 ${
                                          i < review.rating
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        No reviews yet. Be the first to review this product!
                      </p>
                    )}
                  </div>
                )}

                {activeTab === "shipping" && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Shipping Information
                    </h3>
                    <div className="space-y-4 text-gray-600">
                      <p>
                        {product.shippingInformation ||
                          "Ships within 3-5 business days"}
                      </p>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">
                          Shipping Options
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span>Standard Shipping (5-7 days)</span>
                            <span className="font-medium">Free</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Express Shipping (2-3 days)</span>
                            <span className="font-medium">$9.99</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Next Day Delivery</span>
                            <span className="font-medium">$19.99</span>
                          </li>
                        </ul>
                      </div>
                      <p className="text-sm">
                        <strong>Return Policy:</strong>{" "}
                        {product.returnPolicy ||
                          "30 days return policy. Items must be unused and in original packaging."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts?.products && relatedProducts.products.length > 1 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.products
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
