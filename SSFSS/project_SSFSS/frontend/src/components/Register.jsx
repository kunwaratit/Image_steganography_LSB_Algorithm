import React from "react";
import './static/register.css';
import { Link } from "react-router-dom";
function Register(){
    return (<div height="70%">
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form className="signup-form">
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">Sign Up</button>
      </form>
      <div className="login-link">
        <p>
          Already have an account? <Link to="/Login">Log in</Link>
        </p>
      </div>
    </div>
  </div>)
}export default Register;