import React from "react";
import ContactDetails from "./contactinfo";

const YourPage = () => {
  const contacts = [
    {
      name: "team trioka",
      phoneNumber: "01-5581601",
      email: "ssfss.org",
    },
    {
      name: "atit kunwar",
      phoneNumber: "9840266181",
      email: "atit.191508@ncit.edu.np",
    },
    {
      name: "Utsab maharjan",
      phoneNumber: "9841901409",
      email: "utsab.191549@ncit.edu.np",
    },
    {
      name: "Sagar nemkul",
      phoneNumber: "9840250181",
      email: "sagar.191535@ncit.edu.np",
    },
  ];

  return (
    <div>
      <h1>Our Team</h1>
      <ContactDetails contacts={contacts} />
    </div>
  );
};

export default YourPage;
