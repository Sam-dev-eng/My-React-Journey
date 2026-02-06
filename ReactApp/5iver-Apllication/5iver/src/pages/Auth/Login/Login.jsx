import { useState } from "react";
import "../Auth.css";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../../../api/Auth";
import { useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      sessionStorage.setItem("token", data.data.token);
      
      const decoded = jwtDecode(data.data.token);
      sessionStorage.setItem("userEmail", decoded.email);
      sessionStorage.setItem("role", decoded.role);
      sessionStorage.setItem("id", decoded.sub);
      sessionStorage.setItem("userName", decoded.userName);
      const role = decoded.role;
      navigate(role == "CLIENT" ? "/client" : "/seller");

    } catch (err) {
      setError("Invalid Email or password");
    }
  }
  

  return (
    <div className="auth-container">
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="auth-btn">
          Login
        </button>
        {error && <p>{error}</p>}
      </form>

      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}

export default Login;
