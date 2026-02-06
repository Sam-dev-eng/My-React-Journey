import { Link, replace, useNavigate } from "react-router";
import "./Navbar.css"

function Navbar({ isAuthenticated, role }) {


  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    navigate("/", { replace: true })
    
  }


  return (
    <nav className="navbar">
      <h2 className="logo">5iver</h2>

      <ul className="navbar-links">
        <li>Explore</li>
        {role === "seller" && <li>My Gigs</li>}
        <Link to="/Favorites">
          <li>Favorites</li>
        </Link>

        {role === "seller" && (
          <Link to="/create-gig">
            <button className="signup">Create New Gig</button>
          </Link>
        )}
        {role && (
          <Link to="/chats">
            <button className="signup">chats</button>
          </Link>
        )}
      </ul>

      <div className="navbar-right">
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <button className="login">Login</button>
            </Link>
            <Link to="/signup">
              <button className="signup">Sign Up</button>
            </Link>

            <Link to="/signUpSeller">
              <button className="signup">Sign up as a Seller</button>
            </Link>
          </>
        ) : (
          <Link to="/" onClick={handleLogout}>
            <button className="login">Logout</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
