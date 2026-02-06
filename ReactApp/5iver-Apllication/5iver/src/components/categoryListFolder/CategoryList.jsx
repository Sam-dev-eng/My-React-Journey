import "./CategoryList.css";

function CategoryList({ selectedCategory, onSelectCategory }) {
  const categories = [
    "All",
    "Web Development",
    "Design",
    "Video Editing",
    "Writing",
    "Marketing",
  ];

  return (
    <div className="category-list">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-pill ${
            selectedCategory === category ? "active" : ""
          }`}
          onClick={() =>
            onSelectCategory(category === "All" ? null : category)
            }

        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;
