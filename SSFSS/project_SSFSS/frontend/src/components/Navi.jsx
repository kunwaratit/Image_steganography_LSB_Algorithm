
import { NavLink} from 'react-router-dom';
import './static/navi.css'
import logo from './static/logo5.png'
function Navi (){
      return (
        <div>
          <title>{/*{title}*/}</title>
          <header>
            <nav className="navbar">
              <div className="navbar-logo">
              <NavLink to="/Home" className="logo">
                  <img src={logo} style={{padding: '0px'}} />SteganoGraphic Secure File Storage System</NavLink>
              </div>
              <ul  className="navbar-items ">
                <li  className=""><NavLink to="/Home">Home</NavLink></li>
                <li className=""><NavLink to="/Home">Files</NavLink ></li>
                <li className=""><NavLink to="/files">Plans</NavLink ></li>
                <li className=""><NavLink to="/Encrypt">Upload</NavLink ></li>
                <li className=""><NavLink to="/contact">Contact</NavLink ></li>
                <li className=""><NavLink to="/setting">Settings</NavLink ></li>
                <li className=""><NavLink to="/login">Login</NavLink ></li>
                <li className=""><NavLink to="/Register">Register</NavLink ></li>
                <li className=""><NavLink to="/" >Logout</NavLink ></li>
              </ul>            </nav>
          </header>
          <div style={{backgroundColor: '#f1f1f1'}}>
            <hr style={{margin:'0px'}}/>
          </div></div>
      );
    }
export default Navi;