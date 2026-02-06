import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div cassName="bg-orange-500 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white text-center md:text-left">
              <h3 className="text-xl font-bold">Subscribe to our Newsletter</h3>
              <p className="text-orange-100">Get the latest updates on new products and upcoming sales</p>
            </div>
            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-l-lg w-full md:w-80 focus:outline-none text-gray-900"
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-6 py-3 rounded-r-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="text-2xl font-bold text-white mb-4 block">
              <span className="text-orange-500">E</span>Shop
            </Link>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for all your shopping needs. Quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-orange-500 transition-colors">
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-orange-500 transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-orange-500 transition-colors">Categories</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">Shipping & Returns</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">Order Tracking</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <span>123 Shopping Street, Commerce City, CC 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <span>support@eshop.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} EShop. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png" alt="PayPal" className="h-6 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
