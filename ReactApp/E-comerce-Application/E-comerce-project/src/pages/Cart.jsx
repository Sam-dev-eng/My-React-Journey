import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FiTrash2,
  FiPlus,
  FiMinus,
  FiShoppingBag,
  FiArrowLeft,
  FiTag,
} from "react-icons/fi";
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../store/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const shippingCost = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08; // 8% tax
  const orderTotal = cartTotal + shippingCost + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Table Header - Desktop */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b font-medium text-gray-600">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                      {/* Product Info */}
                      <div className="col-span-6 flex gap-4 mb-4 md:mb-0">
                        <Link
                          to={`/product/${item.id}`}
                          className="flex-shrink-0"
                        >
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/product/${item.id}`}
                            className="font-medium text-gray-900 hover:text-orange-500 transition-colors line-clamp-2"
                          >
                            {item.title}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.brand}
                          </p>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="mt-2 text-sm text-red-500 hover:text-red-600 flex items-center gap-1 md:hidden"
                          >
                            <FiTrash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-center mb-4 md:mb-0">
                        <span className="md:hidden text-gray-500 mr-2">
                          Price:
                        </span>
                        <span className="font-medium text-gray-900">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2 flex items-center justify-center mb-4 md:mb-0">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Total & Remove */}
                      <div className="col-span-2 flex items-center justify-between md:justify-end gap-4">
                        <span className="font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="hidden md:block p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Actions */}
              <div className="p-4 bg-gray-50 border-t flex flex-wrap items-center justify-between gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Coupon Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Summary Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-gray-900">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-bold text-orange-500">
                      ${orderTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {cartTotal < 50 && (
                <div className="mb-6 p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-700">
                    Add{" "}
                    <span className="font-semibold">
                      ${(50 - cartTotal).toFixed(2)}
                    </span>{" "}
                    more to get free shipping!
                  </p>
                  <div className="mt-2 h-2 bg-orange-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full transition-all"
                      style={{
                        width: `${Math.min((cartTotal / 50) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <button className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                Proceed to Checkout
              </button>

              {/* Payment Methods */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-3">
                  Secure Payment Methods
                </p>
                <div className="flex items-center justify-center gap-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png"
                    alt="Visa"
                    className="h-6 object-contain"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png"
                    alt="Mastercard"
                    className="h-6 object-contain"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png"
                    alt="PayPal"
                    className="h-6 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
