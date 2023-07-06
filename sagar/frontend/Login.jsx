import React, { useState } from "react";
import { Link } from "react-router-dom";
import Validation from "./LoginValidation";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(values));
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <input
          type="email"
          placeholder="Your email"
          id="email"
          name="email"
          onChange={handleInput}
        />
        {errors.email && <span className="text-danger">{errors.email}</span>}

        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          onChange={handleInput}
        />
        {errors.password && (
          <span className="text-danger">{errors.password}</span>
        )}
        <button type="submit">Log In</button>
      </form>
      <Link to="/signup" className="link-btn">
        Don't have an account? Register here
      </Link>
    </div>
  );
}

export default Login;
