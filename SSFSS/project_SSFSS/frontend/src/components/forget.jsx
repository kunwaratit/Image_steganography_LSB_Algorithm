import React, { useState } from "react";
import "../components/static/forger.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle forgot password
    // For simplicity, we'll just display a message here
    setMessage(`A reset link has been sent to ${email}`);
  };

  

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
      <div className="login-link">
          
            <Link to="/Login">Log in</Link>
          
        </div>
    </div>
  );
};

export default ForgotPassword;
