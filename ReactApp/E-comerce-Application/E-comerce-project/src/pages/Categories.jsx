import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../store/api/productsApi";
import Loading from "../components/Loading";

const categoryIcons = {
  beauty: "💄",
  fragrances: "🌸",
  furniture: "🪑",
  groceries: "🛒",
  "home-decoration": "🏠",
  "kitchen-accessories": "🍳",
  laptops: "💻",
  "mens-shirts": "👔",
  "mens-shoes": "👞",
  "mens-watches": "⌚",
  "mobile-accessories": "📱",
  motorcycle: "🏍️",
  "skin-care": "🧴",
  smartphones: "📲",
  "sports-accessories": "⚽",
  sunglasses: "🕶️",
  tablets: "📱",
  tops: "👚",
  vehicle: "🚗",
  "womens-bags": "👜",
  "womens-dresses": "👗",
  "womens-jewellery": "💍",
  "womens-shoes": "👠",
  "womens-watches": "⌚",
};

const Categories = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">
            Error loading categories. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-2">
            Browse our wide range of product categories
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories?.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="group bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                <span className="text-4xl">
                  {categoryIcons[category.slug] || "🛍️"}
                </span>
              </div>
              <h3 className="font-medium text-gray-900 capitalize group-hover:text-orange-500 transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
