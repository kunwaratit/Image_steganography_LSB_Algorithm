import React from "react";
import './static/contact.css'
function Contact(){
    return (
    <div className="cpm">
      <div className="contactPage">
        <div className="contactMsg">
          <h3>Contact for more info</h3>
          <h4>To Contact with us </h4>
              <span>Provide your detail information and the explain the subject matter briefly and contact</span>
              <br /><p><li>contact to our mail id </li>
                    <li>contact to our contact number</li>
                    <li>or Directly visit to our office</li>
                    <li><a href="">9842803777</a></li>
                    <li><a href="">atit.191508@ncit.edu.np</a></li>
              </p>

          
        </div>
        <div className="contact-container">
          <h1>Contact Us</h1>
          <form className="contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Message" defaultValue={""} />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
    )
}export default Contact;
