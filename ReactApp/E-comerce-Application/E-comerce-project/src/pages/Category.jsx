import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProductsQuery } from "../store/api/productsApi";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

const Category = () => {
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProductsQuery({
    limit: productsPerPage,
    skip: (currentPage - 1) * productsPerPage,
    category: slug,
  });

  const sortProducts = (products) => {
    if (!products) return [];
    const sorted = [...products];
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "name":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  };

  const sortedProducts = sortProducts(productsData?.products);
  const totalPages = Math.ceil((productsData?.total || 0) / productsPerPage);

  const formatCategoryName = (slug) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Category Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The category you're looking for doesn't exist.
          </p>
          <Link
            to="/categories"
            className="inline-block px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Browse Categories
          </Link>
        </div>
      </div>
    );
  }

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
              to="/categories"
              className="text-gray-500 hover:text-orange-500 transition-colors"
            >
              Categories
            </Link>
            <FiChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">
              {formatCategoryName(slug)}
            </span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold">
            {formatCategoryName(slug)}
          </h1>
          <p className="text-orange-100 mt-2">
            {productsData?.total || 0} products found
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          {/* Results Count */}
          <p className="text-gray-600 text-sm">
            Showing {sortedProducts.length} of {productsData?.total || 0}{" "}
            products
          </p>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            >
              <option value="default">Default Sorting</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A to Z</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No products found in this category.</p>
            <Link
              to="/shop"
              className="inline-block mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {[...Array(Math.min(totalPages, 5))].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg transition-colors ${
                    currentPage === pageNum
                      ? "bg-orange-500 text-white"
                      : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && <span className="px-2">...</span>}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
