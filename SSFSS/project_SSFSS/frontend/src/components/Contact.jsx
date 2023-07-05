import React from "react";
import './static/contact.css'
function Contact(){
    return (
        <div className="contact-container">
  <h1>Contact Us</h1>
  <form className="contact-form">
    <input type="text" placeholder="Your Name" />
    <input type="email" placeholder="Your Email" />
    <textarea placeholder="Message" defaultValue={""} />
    <button type="submit">Send Message</button>
  </form>
</div>
    )
}export default Contact;
