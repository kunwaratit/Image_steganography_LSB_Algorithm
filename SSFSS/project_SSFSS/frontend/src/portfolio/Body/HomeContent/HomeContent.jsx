import React from "react";
import "./static/HomeContent.css"
function HomeContent(){
return(
    <>
     <div className="homeContent" id="home">

<div className="leftHomeContent ">
    <div className="vacant"></div>
    <div className="value">
        <h5>Full-Stack Developer</h5>

        <h1>Hi, I am <span style={{color: "#ffae0f" ,fontSize: "45px",   letterSpacing: "3px"}}>Atit
                Kunwar
            </span></h1>
        <h4>
            from Kathmandu
            Nepal.I am a Full-Stack Developer having the experiencing on different projects
        </h4>
        <button className="resumeButton">View Resume</button>
    </div>
</div>
<div className="rightHomeContent">
    <div className="profile">
        <div className="userphoto"></div>
        <div className="userInfo">asdas</div>
        <div className="userconnect">
            <a href="https://github.com/kunwaratit/" target="_blank">github</a>
            <a href="">Linkedin</a>
            <a href="">Facebook</a>
            <a href="">Discord</a>
            <h3 style={{margin: "0px", color:"rgb(138, 138, 138) "}}>
                Connect with me :</h3>
            {/* <!--connect--> */}
            <div className="as">
                <ul id="connect" style={{margin: "0px"}}>

                    {/* <!--facebook--> */}

                    <li id="facebook">
                        <a href="#" title="Facebook:Atit kunwar" target="blank">
                            <i class="fab fa-facebook-f"></i>Fac</a>
                    </li>
                    {/* <!--instagram--> */}
                    <li id="insta">
                        <a href="https://instagram.com/kunwar_atit" target="blank">
                            <i class="fab fa-instagram"></i></a>
                    </li>
                    {/* <!--github--> */}
                    <li>
                        <a href="https://github.com/kunwaratit" target="blank" title="Github:kunwaratit">
                            <i class="fab fa-github"></i></a>
                    </li>
                    {/* <!--twitter--> */}
                    <li id="twitter">
                        <a href="https://twitter.com/Atitkunwar2" target="blank"
                            title="twitter:atitkunwar2">
                            <i class="fab fa-twitter"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>       <div className="ProjectInfo">
                    <div className="completedProj">
                        <h3><span>10+</span></h3>
                        <h5>Completed Projects</h5>
                    </div>
                    <div className="satisfiedClient">
                        <h3><span>8+</span></h3>
                        <h5>Satisfied Client</h5>
                    </div>

                </div>
            </div>

        </div>
    </>
)
}export default HomeContent