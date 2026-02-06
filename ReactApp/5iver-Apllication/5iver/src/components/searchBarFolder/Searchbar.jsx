import "./SearchBar.css"

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
    <span className="icon">🔍</span>
    <input
      type="text"
      placeholder="Search for services..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    </div>
    
  );
}

export default SearchBar;
