import React from "react"
import './static/Login.css'
import { Link } from "react-router-dom";
function Login(){
return (<div className="login-container">
  <h1>Login</h1>
  <form className="login-form">
    <input type="text" placeholder="Username" />
    <input type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
  <div className="links">
   <Link to="/Register">Sign up</Link> | <a href="#">Forgot password?</a>
  </div>
</div>
);
}export default Login;