import { Link, useMatch, useResolvedPath } from "react-router-dom";
import React from "react";
import logo from "./logo.png";
import "./index.css";

function Navbar() {
  return (
    <>
      <header>
        <nav className="nav">
          <Link to="/" className="site-logo">
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <ul>
            <CustomLink to="/upload">Upload</CustomLink>
            <CustomLink to="/contact">Contact</CustomLink>

            <CustomLink to="/login">Login</CustomLink>
            <CustomLink to="/signup">Signup</CustomLink>
          </ul>
        </nav>
      </header>
      <hr />
    </>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
