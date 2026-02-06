import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import {
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
  closeCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/slices/cartSlice";

const CartSidebar = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const isCartOpen = useSelector(selectIsCartOpen);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={() => dispatch(closeCart())}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={() => dispatch(closeCart())}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <FiShoppingBag className="w-16 h-16 mb-4" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-sm">Add some products to get started!</p>
              <button
                onClick={() => dispatch(closeCart())}
                className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  {/* Product Image */}
                  <Link
                    to={`/product/${item.id}`}
                    onClick={() => dispatch(closeCart())}
                    className="flex-shrink-0"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.id}`}
                      onClick={() => dispatch(closeCart())}
                    >
                      <h3 className="font-medium text-gray-900 truncate hover:text-orange-500 transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="text-orange-500 font-semibold mt-1">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="p-1 hover:bg-gray-100 transition-colors"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-bold text-gray-900">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <Link
                to="/cart"
                onClick={() => dispatch(closeCart())}
                className="block w-full py-3 text-center border-2 border-orange-500 text-orange-500 rounded-lg font-medium hover:bg-orange-50 transition-colors"
              >
                View Cart
              </Link>
              <button className="w-full py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                Checkout
              </button>
            </div>

            {/* Free Shipping Notice */}
            <p className="text-center text-sm text-gray-500">
              Free shipping on orders over $50!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
