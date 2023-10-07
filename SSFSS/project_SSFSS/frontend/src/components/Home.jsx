import React from "react";
import { Link } from "react-router-dom";
import Slider from "./slider";
import "./static/Home.css";
import Contact from "./Contact";

import FAQSection from "./QnA";

function Home() {
  return (
    <>
      <hr />
      <Slider />

      <div
        style={{ backgroundColor: "#ffffffdc", margin: "0px 5vw", padding: 50 }}
      >
        <section className="hero-section" id="main">
          <div className="hero-content">
            <h1>Secure File System</h1>

            <div style={{ height: "20em" }}></div>
            <p>Protect and manage your files with ease.</p>
            <Link to="/Login" className="cta-button">
              Get Started
            </Link>
          </div>
        </section>

        <section className="pricing-section" id="pricing">
          <h2>Pricing</h2>
          <p>
            Choose a plan that suits your needs and start securing your files
            today.
          </p>
          <div className="pricing-plans">
            <div className="pricing-plan">
              <h3>Basic</h3>
              <p>5 GB Storage</p>
              <p>Up to 5 Users</p>
              <p>Rs.999/month</p>
              <a href="#" className="cta-button">
                Choose Plan
              </a>
            </div>
            <div className="pricing-plan">
              <h3>Pro</h3>
              <p>25 GB Storage</p>
              <p>Up to 10 Users</p>
              <p>Rs.1999/month</p>
              <a href="#" className="cta-button">
                Choose Plan
              </a>
            </div>
            <div className="pricing-plan">
              <h3>Enterprise</h3>
              <p>Unlimited Storage</p>
              <p>Custom User Limit</p>
              <p>Contact Us</p>
              <a href="#" className="cta-button">
                Contact Sales
              </a>
            </div>
          </div>
        </section>

        <section id="contact">
          <br />
          <Contact />
        </section>

        <section id="QnA">
          <br />
          <FAQSection />
        </section>
      </div>
    </>
  );
}
export default Home;
