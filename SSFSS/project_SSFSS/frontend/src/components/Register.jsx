import React, { useState } from "react";
import './static/register.css';
import { Link } from "react-router-dom";
import axios from "axios"; // Import the axios library

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    password: ""
  });
  const formatDate = (dateString) => {
    // Function to format the date as "YYYY-MM-DD"
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "date_of_birth") {
      // Format the date as "YYYY-MM-DD" before setting it in the formData
      const formattedDate = formatDate(value);
      setFormData({ ...formData, [name]: formattedDate });
    }else {
      setFormData({ ...formData, [name]: value });
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/register/', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data); // Handle the response from the server, e.g., show a success message
      })
      .catch(error => {
        console.error(error); // Handle the error response from the server, e.g., show an error message
      });
  };

  return (
    <div height="70%">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} />
          <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="phone_number" placeholder="Phone" value={formData.phone_number} onChange={handleChange} />
          <input type="date" name="date_of_birth" placeholder="Date of Birth" value={formData.date_of_birth} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <button type="submit">Sign Up</button>
        </form>
        <div className="login-link">
          <p>
            Already have an account? <Link to="/Login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
