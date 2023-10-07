import React from "react";
import "../components/static/footer.css";


function Footer() {

  
  return (

    <>
      <hr />
      <footer>
        <div className="footer-content">
          <p>© 2023 Secure File System. All rights reserved.</p>
          <ul className="footer-links">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="/Home/#QnA" >FAQ</a>
            </li>
            <li>
              <a href="/Contactinfo">Contact</a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
export default Footer;
