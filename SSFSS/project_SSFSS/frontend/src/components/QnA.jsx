import React, { useState } from "react";
import "../components/static/QnA.css";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dwg-accordion-item">
      <div className="dwg-accordion-item__label-box" onClick={toggleAccordion}>
        <span className="dwg-text">{question}</span>
        <div className="dwg-accordion-item__chevron">
          {isOpen ? (
            <svg width="24" height="24" fill="none">
              <path
                d="M5.25 9.25 11.75 15.5 18.25 9.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none">
              <path
                d="M5.25 9.25 11.75 15.5 18.25 9.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="dwg-accordion-item__dropdown-inner">
          <div className="dwg-box">
            <div className="dwg-text">{answer}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  return (
    <div className="dwg-flex-grid__cell dwg-box">
      <div className="dwg-box dwg-mb--6">
        <h2 className="dwg-text">Frequently asked questions</h2>
      </div>
      <div className="dwg-accordion dwg-box">
        <FAQItem
          question="What is Steganography?"
          answer="Steganography is the art of hiding the fact that communication is taking place, by hiding information in other information. Many different carrier file formats can be used, but digital images are the most popular because of their frequency on the internet. For hiding secret information in images, there exist a large variety of steganography techniques some are more complex than other and all of them have respective strong and weak points. Different application has different requirement of the steganography technique used."
        />
        <hr />
        <FAQItem
          question="What are our objectives?"
          answer="

          •	To create an web application to hide confidential data inside a 24-bit color image encrypting the message producing cipher text.
          •	To display the hidden message successfully from the cover image if and only if  key is matched.
          ."
        />
        <hr />
        <FAQItem
          question="What technology we use??"
          answer="We are using LSB (Least Significant Bit) algorithm to achieve image steganography. The main reason for using LSB over other algorithm is because the bits of image are replaced by the LBSs of the pixel value of the image resulting best quality picture. Because the LSBs are alone changed, normal human eye cannot predict the difference between the real image and the image after the encryption. Beside these things it is easier to understand, easier to implement and has good results when comes to data hiding."
        />

        <hr />
        <FAQItem
          question="why SSFSS?"
          answer="SSFSS make sure your files are protected and safe."
        />

        <hr />
        <FAQItem
          question="why SSFSS?"
          answer="SSFSS make sure your files are protected and safe."
        />
      </div>
    </div>
  );
};

export default FAQSection;
