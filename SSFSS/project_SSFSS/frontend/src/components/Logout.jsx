import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useAuth } from './AuthContext'; // Import useAuth hook

import { getCookie } from './utils';
import {useHistory } from "react-router-dom";
function Logout({ setShouldReloadNavi }) {
  const { logout, isAuthenticated } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();


 // const [isAuthenticated, setIsAuthenticated] = useState(false); // Define isAuthenticated


  const handleLogout = () => {
    if (!loggingOut) {
      setLoggingOut(true);
      console.log('CSRF Token:',getCookie('csrftoken'));
    // Clear any authentication data from local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('email')
      localStorage.removeItem('user_id')
      localStorage.removeItem('message')
      localStorage.removeItem('id')
       // Replace with the actual item name
    // Other items you want to remove, e.g., user info, etc.
      
      axios.post('http://localhost:8000/api/logout/', null, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken'), // Replace getCookie with your method to get the CSRF token from the cookies
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include credentials to send the CSRF token
      })
     
      .then(response => {
        
        logout(); // Set isAuthenticated to false on logout
     
        console.log(response.data); // Handle the logout response from the server, e.g., show a success message
        // Clear any authentication data from local storage or cookies, e.g., token, user info, etc.
        // Redirect the user to the login page or perform any other desired action
        navigate('/Home');
      })
      .catch(error => {
        console.error(error); // Log the error for debugging purposes
        // Handle the error response from the server, if needed
      })
      .finally(() => {
        setLoggingOut(false); // Reset the state to allow subsequent logout attempts
      });
      
    }
  };

  return (
    <div>
    
    
        <button onClick={handleLogout} disabled={loggingOut}>
          {loggingOut ? 'Logging Out...' : 'Logout'}
        </button>
      </div>
  );
}

export default Logout;
