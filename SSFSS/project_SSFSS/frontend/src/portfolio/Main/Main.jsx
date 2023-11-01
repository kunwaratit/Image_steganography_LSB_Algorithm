import React from "react";
import Nav from "../NavBar/Nav";
import Footer from "../Footer/Footer";
import HomeContent from "../Body/HomeContent/HomeContent";
import Skill from "../Body/Skills/Skills";
import "./static/main.css"
import Contact from "../Body/Contact/Contact";
function Main(){
    return(<>
    <Nav/>
        <HomeContent/>
        <div class="bodyContainer">
            <Skill/>
            <Contact/>
        </div>
    <Footer/>
    </>
    )
}export default Main