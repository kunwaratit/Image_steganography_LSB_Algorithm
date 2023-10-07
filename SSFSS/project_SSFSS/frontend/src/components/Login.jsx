import React, { useState } from "react";
import './static/Login.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; 
import { getCookie } from './utils';
import { useAuth } from './AuthContext'; // Import useAuth hook
import Validation from "./LoginValidation";
import ForgotPassword from "./forget";
function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState('');
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate(); 

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    axios.post('http://localhost:8000/api/login/', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      //const token = response.data.Token.access;
      const {email, user_id,id, message } = response.data;
      const Token = response.data.Token.access;
      if (Token) {
        localStorage.setItem('authToken', Token);
        localStorage.setItem('email', email);
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('id', id);
        localStorage.setItem('message', message);

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
        setError("Invalid ! Try again.");
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
      {error && <div className="error-message" style={{ color: 'red' }}> {error}</div>}
      <form className="login-form" onSubmit={handleLogin}>
        <input type="text" name="email" placeholder="User Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <div className="links">
        <Link to="/Register">Sign up</Link> |<Link to="/Forgot">Forgot password?</Link>"
      </div>
    </div>
  );
}

export default Login;
