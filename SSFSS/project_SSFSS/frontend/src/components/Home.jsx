import React from "react";
import { Link } from "react-router-dom";
import './static/Home.css';
import Contact from "./Contact"; 
function Home(){
    return (
        <>
  
  <div style={{ backgroundColor: "#ffffffdc", margin: "0px 5vw", padding: 50 }}>
    <section className="hero-section" id="main">
      <div className="hero-content" >
        <h1>Secure File System</h1>

        <div style={{ height: "20em" }}>

        </div>
        <p>Protect and manage your files with ease.</p>
        <Link to="/Login" className="cta-button">Get Started</Link>
       
      </div>
    </section>



    <section className="features-section">
      <div className="feature">
        <h2>Secure File Storage</h2>
        <p>
          Store your files in a highly secure environment with advanced
          encryption technology.
        </p>
      </div>
      <div className="feature">
        <h2>Access Control</h2>
        <p>
          Control who can access your files and folders with fine-grained
          permissions and user management.
        </p>
      </div>
      <div className="feature">
        <h2>Collaboration</h2>
        <p>
          Collaborate with your team by sharing files, commenting, and tracking
          changes in real-time.
        </p>
      </div>
    </section>
    <section className="pricing-section" id="pricing">
      <h2>Pricing</h2>
      <p>
        Choose a plan that suits your needs and start securing your files today.
      </p>
      <div className="pricing-plans">
        <div className="pricing-plan">
          <h3>Basic</h3>
          <p>5 GB Storage</p>
          <p>Up to 5 Users</p>
          <p>$9.99/month</p>
          <a href="#" className="cta-button">
            Choose Plan
          </a>
        </div>
        <div className="pricing-plan">
          <h3>Pro</h3>
          <p>25 GB Storage</p>
          <p>Up to 10 Users</p>
          <p>$19.99/month</p>
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
  </div>
</>

    )
}export default Home;