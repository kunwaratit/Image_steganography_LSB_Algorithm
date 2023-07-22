import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';

import { getCookie } from './utils';

function Logout() {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    if (!loggingOut) {
      setLoggingOut(true);
      axios.post('http://localhost:8000/api/logout/', null, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken'), // Replace getCookie with your method to get the CSRF token from the cookies
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Include credentials to send the CSRF token
      })
      .then(response => {
        console.log(response.data); // Handle the logout response from the server, e.g., show a success message
        // Clear any authentication data from local storage or cookies, e.g., token, user info, etc.
        // Redirect the user to the login page or perform any other desired action
        navigate('/login');
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
    <button onClick={handleLogout} disabled={loggingOut}>
      {loggingOut ? 'Logging Out...' : 'Logout'}
    </button>
  );
}

export default Logout;
