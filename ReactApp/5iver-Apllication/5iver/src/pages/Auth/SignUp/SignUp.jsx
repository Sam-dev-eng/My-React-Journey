import { useState } from "react";
import "../Auth.css";
import { registerUser } from "../../../api/Auth";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

function Signup(prop) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setRole(prop.role);
      const data = await registerUser({fullName, email, password, role});
      
      sessionStorage.setItem("token", data.data.token);
      const decoded = jwtDecode(data.data.token);
      sessionStorage.setItem("userEmail", decoded.email);
      sessionStorage.setItem("role", decoded.role);
      sessionStorage.setItem("id", decoded.sub);
      sessionStorage.setItem("userNameSignUp", decoded.userName);
      const userRole = decoded.role;
      navigate(userRole == "CLIENT" ? "/client" : "/seller"); 
      console.log(data.data.token);
    } catch (err) {
      setError("Check your credencials something must be wrong")
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

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
          Sign Up
        </button>
        {error && <p>{error}</p>}
      </form>

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Signup;
