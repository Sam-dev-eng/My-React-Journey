import { Link } from 'react-router-dom';
import { useGetProductsQuery, useGetCategoriesQuery } from '../store/api/productsApi';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { FiTruck, FiShield, FiHeadphones, FiRefreshCw, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const { data: productsData, isLoading: productsLoading, error: productsError } = useGetProductsQuery({ limit: 8 });
  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery();

  const features = [
    {
      icon: FiTruck,
      title: 'Free Shipping',
      description: 'On orders over $50',
    },
    {
      icon: FiShield,
      title: 'Secure Payment',
      description: '100% secure payment',
    },
    {
      icon: FiHeadphones,
      title: '24/7 Support',
      description: 'Dedicated support',
    },
    {
      icon: FiRefreshCw,
      title: 'Easy Returns',
      description: '30 days return policy',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                New Collection 2024
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Discover Your Style
              </h1>
              <p className="text-lg md:text-xl text-orange-100 mb-8 max-w-lg">
                Explore our curated collection of premium products at unbeatable prices. Quality meets affordability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  to="/shop"
                  className="px-8 py-3 bg-white text-orange-500 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                </Link>
                <Link
                  to="/categories"
                  className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Browse Categories
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=500&fit=crop"
                alt="Shopping"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                  <feature.icon className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
            <p className="text-gray-600">Browse our wide range of categories</p>
          </div>

          {categoriesLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categoriesData?.slice(0, 6).map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="group bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                    <span className="text-2xl">🛍️</span>
                  </div>
                  <h3 className="font-medium text-gray-900 capitalize text-sm">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-orange-500 font-medium hover:text-orange-600 transition-colors"
            >
              View All Categories
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Discover our most popular items</p>
            </div>
            <Link
              to="/shop"
              className="hidden md:inline-flex items-center gap-2 px-6 py-2 border-2 border-orange-500 text-orange-500 rounded-lg font-medium hover:bg-orange-500 hover:text-white transition-colors"
            >
              View All
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {productsLoading ? (
            <Loading />
          ) : productsError ? (
            <div className="text-center py-10">
              <p className="text-red-500">Error loading products. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productsData?.products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              View All Products
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-orange-500 rounded-full text-sm font-medium mb-4">
                Limited Time Offer
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get 20% Off Your First Order
              </h2>
              <p className="text-gray-400 mb-6">
                Sign up for our newsletter and receive an exclusive discount code for your first purchase.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-orange-500 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&h=400&fit=crop"
                alt="Special Offer"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
