import React, { useState } from "react";
import './static/Login.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; 
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("")
    axios.post('http://localhost:8000/api/login/', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data); // Handle the response from the server, e.g., show a success message
      })
      .catch(error => {
        console.error(error); // Log the error for debugging purposes
        // Handle the error response from the server, e.g., show an error message
        if (error.response && error.response.data && error.response.data.detail) {
          setError(error.response.data.detail);
        } else {
          setError("An error occurred while logging in. Please try again later.");
        } });
    // Simulate login logic (replace with actual login API call)
  
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
        <Link to="/Register">Sign up</Link> | <a href="#">Forgot password?</a>
      </div>
    </div>
  );
}

export default Login;
