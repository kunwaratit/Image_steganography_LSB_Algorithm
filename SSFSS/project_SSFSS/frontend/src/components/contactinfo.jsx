import React from "react";
import "../components/static/info.css";

const ContactDetails = ({ contacts }) => {
  return (
    <div>
      <h2><u>Contact Details</u></h2>
      {contacts.map((contact, index) => (
        <div className="info-container" key={index}>
          <p>
            <strong>Name:</strong> {contact.name}
            
          </p>
             
          <p>
            <strong>Phone:</strong> {contact.phoneNumber}
          </p>
          
          <p>
            <strong>Email:</strong> {contact.email}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ContactDetails;
