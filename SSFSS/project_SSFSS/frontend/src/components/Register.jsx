import React, { useState } from "react";
import './static/register.css';
import { Link, useNavigate  } from "react-router-dom";
import axios from "axios"; // Import the axios library
import Validation from "./RegisterValidation";
//import { useHistory } from "react-router";
function Register(props) {
  //const history = useHistory();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    password: ""
  });

{/*  const formatDate = (dateString) => {
    // Function to format the date as "YYYY-MM-DD"
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
*/}const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    
      setFormData({ ...formData, [name]: value });
        
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(formData));
    
    
    axios.post('http://localhost:8000/api/register/', formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data); 
        if (response.data.errors) {
          setErrors({ ...errors, ...response.data.errors }); // Set the error message in state
        } else {
          // Registration successful, handle accordingly
          console.log('Registration successful');
          navigate("/Login");
        }
        // Handle the response from the server, e.g., show a success message
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          const serverErrors = error.response.data.errors;
          setErrors({ ...errors, ...serverErrors });
        } else {
          console.error(error);
        } // Handle the error response from the server, e.g., show an error message
      });
  }; const handleRequestOTP = () => {
    // Implement your logic here to make a request for OTP
    // You can send a request to your server to generate and send an OTP
    // Once you receive the OTP, you can handle it accordingly
  };

  return (
    <div height="70%">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          {errors.first_name && <span className="text-danger">{errors.first_name}</span>}
          <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required/>
           <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required/>
           {errors.email && <span className="text-danger">{errors.email}</span>}
          <input type="email" name="email" placeholder="userEmail" value={formData.email} onChange={handleChange}required />
          {errors.phone_number && <span className="text-danger">{errors.phone_number}</span>}
          <input type="text" name="phone_number" placeholder="Phone" value={formData.phone_number} onChange={handleChange} required/>
          {errors.password && (
          <span className="text-danger">{errors.password}</span>
        )}
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
          {errors.confirmpassword && (
          <span className="text-danger">{errors.confirmpassword}</span>
        )}
        <input
          name="confirmpassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}required
        />
  {/* OTP input field and button 
        <div className="otp-container">
        <button
              type=""
              onClick={handleRequestOTP}
              className="otp-button"
            >
              Request OTP
            </button>
            <input
            className="otp"
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </div>

*/}
        
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
