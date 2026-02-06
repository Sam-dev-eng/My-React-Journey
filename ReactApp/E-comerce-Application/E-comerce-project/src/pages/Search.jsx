import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useSearchProductsQuery } from "../store/api/productsApi";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { FiSearch, FiChevronDown } from "react-icons/fi";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [sortBy, setSortBy] = useState("default");

  const {
    data: searchResults,
    isLoading,
    error,
  } = useSearchProductsQuery(query, {
    skip: !query,
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

  const sortedProducts = sortProducts(searchResults?.products);

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiSearch className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Search for Products
          </h2>
          <p className="text-gray-600 mb-6">
            Enter a search term to find products.
          </p>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Browse All Products
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
          <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
          <p className="text-gray-600 mt-2">
            {isLoading ? (
              "Searching..."
            ) : (
              <>
                {searchResults?.total || 0} results for "
                <span className="font-medium">{query}</span>"
              </>
            )}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">
              Error searching products. Please try again later.
            </p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-10">
            <FiSearch className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No results found
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't find any products matching "{query}". Try a different
              search term.
            </p>
            <Link
              to="/shop"
              className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              {/* Results Count */}
              <p className="text-gray-600 text-sm">
                Showing {sortedProducts.length} of {searchResults?.total || 0}{" "}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
