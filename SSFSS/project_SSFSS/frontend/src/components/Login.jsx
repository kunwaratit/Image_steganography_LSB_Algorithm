import React, { useState } from "react";
import './static/Login.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; 
import { getCookie } from './utils';
import { useAuth } from './AuthContext'; // Import useAuth hook

function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    axios.post('http://localhost:8000/api/login/', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      const token = response.data.Token.access;
      if (token) {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
        navigate('/Home');
        window.location.reload();
        
      }
    })
    .catch(error => {
      console.error(error);
      if (error.response && error.response.data && error.response.data.detail) {
        setError(error.response.data.detail);
      } else {
        setError("An error occurred while logging in. Please try again later.");
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      <form className="login-form" onSubmit={handleLogin}>
        <input type="text" name="email" placeholder="Email or password" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <div className="links">
        <Link to="/Register">Sign up</Link> | <button onClick={() => console.log("Forgot password?")}>Forgot password?</button>
      </div>
    </div>
  );
}

export default Login;
