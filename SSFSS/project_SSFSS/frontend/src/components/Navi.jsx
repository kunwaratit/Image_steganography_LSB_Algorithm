import { NavLink } from 'react-router-dom';
import './static/navi.css';
import logo from './static/logo5.png';
import Logout from "./Logout";
import React, { useState, useEffect } from "react";
import { getAuthToken } from "./utils";
import Login from './Login';
import '../App.css'
function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check izf the user has a valid authentication token in localStorage
    const token = localStorage.getItem('authToken'); // Replace 'authToken' with your token key
    const userIsAuthenticated = !!token; // Convert token to a boolean value
    setIsAuthenticated(userIsAuthenticated);
    


  const handleScroll = () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
      navbar.style.position = 'fixed';
      // Add other styles as needed
    } else {
      navbar.style.position = 'static';
      // Add other styles as needed
    }
  };

  window.addEventListener('scroll', handleScroll);

  // Remove the event listener when the component unmounts
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);


  const handleScrollToPricing = () => {
    const PSection = document.getElementById("pricing");
    if (PSection) {
      PSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToContact = () => {
    const CSection = document.getElementById("contact");
    if (CSection) {
      CSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleScrollToHome = () => {
    const CSection = document.getElementById("main");
    if (CSection) {
      CSection.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <div>
      <title>{/*{title}*/}</title>
      <header>
        <nav className="navbar"  style={{ position: "sticky", top: "0", zIndex: "1000" }}>
          <div className="navbar-logo">
            <NavLink to="/Home" className="logo">
              <img src={logo} style={{ padding: '0px' }} />SteganoGraphic Secure File Storage System
            </NavLink>
          </div>
          <ul className="navbar-items">
            <li className=""><NavLink to="/Home/#main" onClick={handleScrollToHome}>Home</NavLink></li>
            <li className=""><NavLink to="/Home/#pricing"   onClick={handleScrollToPricing}>Plans</NavLink></li>
            <li className=""><NavLink to="/Home/#contact" onClick={handleScrollToContact}>Contact</NavLink></li>
            {isAuthenticated ? (
              // Render the Logout component when the user is authenticated
              <>
              <li className=""><NavLink to="/Encrypt">Upload</NavLink></li>
              <li className=""><NavLink to="/Myfiles">Files</NavLink></li>
              <li className=""><NavLink to="/Setting">Settings</NavLink></li>
              <li className="atit"  style={{width:"75px"}}><Logout/></li>
            </>) :( <><li className=""><NavLink to="/Login">Login</NavLink></li>
            <li className=""><NavLink to="/Register">Register</NavLink></li>
           </>) }
          </ul>
        </nav>
      </header>
      <div style={{ backgroundColor: '#f1f1f1' }}>
        <hr style={{ margin: '0px' }} />
      </div>
    </div>
  );
}

export default Navi;
