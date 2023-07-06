import React, { useState } from "react";
import { Link } from "react-router-dom";
import Validation from "./RegisterValidation";

function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
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
      <form className="register-form" onSubmit={handleSubmit}>
        <h1> Sign up </h1>
        <input
          name="name"
          placeholder="Full name"
          type="text"
          onChange={handleInput}
        />
        {errors.name && <span className="text-danger">{errors.name}</span>}

        <input
          name="email"
          type="email"
          placeholder="Your email"
          onChange={handleInput}
        />
        {errors.email && <span className="text-danger">{errors.email}</span>}

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleInput}
        />
        {errors.password && (
          <span className="text-danger">{errors.password}</span>
        )}
        <input
          name="cpassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleInput}
        />
        {errors.cpassword && (
          <span className="text-danger">{errors.cpassword}</span>
        )}
        <button type="submit">Sign up</button>
      </form>
      <Link to="/login" className="link-btn">
        {" "}
        Already have an account? Register here
      </Link>
    </div>
  );
}

export default Register;
