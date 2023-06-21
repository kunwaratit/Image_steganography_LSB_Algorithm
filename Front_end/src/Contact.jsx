import React from "react";

const Contact = () => {
  return (
    <>
      <h1>Contact US</h1>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="text" placeholder="Your Email" />
        <textarea placeholder="Message" />
        <button type="submit"> Publish </button>
      </form>
    </>
  );
};

export default Contact;
