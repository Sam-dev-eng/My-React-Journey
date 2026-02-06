import { useState } from "react";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
} from "../store/api/productsApi";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const productsPerPage = 12;

  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProductsQuery({
    limit: productsPerPage,
    skip: (currentPage - 1) * productsPerPage,
    category: selectedCategory,
  });

  const { data: categoriesData } = useGetCategoriesQuery();

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
          <p className="text-gray-600 mt-2">
            Discover our amazing collection of products
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleCategoryChange("")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === ""
                        ? "bg-orange-500 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    All Products
                  </button>
                </li>
                {categoriesData?.map((category) => (
                  <li key={category.slug}>
                    <button
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors capitalize ${
                        selectedCategory === category.slug
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FiFilter className="w-4 h-4" />
                Filters
              </button>

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
            {isLoading ? (
              <Loading />
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-red-500">
                  Error loading products. Please try again later.
                </p>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No products found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
      </div>

      {/* Mobile Filter Sidebar */}
      {isFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-80 bg-white z-50 lg:hidden overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleCategoryChange("")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === ""
                        ? "bg-orange-500 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    All Products
                  </button>
                </li>
                {categoriesData?.map((category) => (
                  <li key={category.slug}>
                    <button
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors capitalize ${
                        selectedCategory === category.slug
                          ? "bg-orange-500 text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
