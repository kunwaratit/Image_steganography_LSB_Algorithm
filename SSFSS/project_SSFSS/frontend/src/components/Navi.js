
import { NavLink} from 'react-router-dom';
import './static/navi.css'
function Navi (){
      return (
        <div>
          <title>{'{'}{'{'}title{'}'}{'}'}</title>
          <header>
            <nav className="navbar">
              <div className="navbar-logo">
                <a href="/"><img src="/static/logo5.png" alt='as' style={{padding: '0px'}} />SteganoGraphic Secure File Storage System</a>
              </div>
              <ul  className="navbar-items ">
                <li  className=""><NavLink to="/">Home</NavLink></li>
                <li className="{% if request.path == '/files/' %}active {% endif %}"><NavLink to="/Home">Files</NavLink ></li>
                <li className="{% if request.path == '/files/' %}active {% endif %}"><NavLink to="/files">Plans</NavLink ></li>
                <li className="{% if request.path == '/upload/' %}active {% endif %}"><NavLink to="/upload">Upload</NavLink ></li>
                <li className="{% if request.path == '/contact/' %}active {% endif %}"><NavLink to="/contact">Contact</NavLink ></li>
                <li className="{% if request.path == '/setting/' %}active {% endif %}"><NavLink to="/setting">Settings</NavLink ></li>
                <li className="{% if request.path == '/login/' %}active {% endif %}"><NavLink to="/login">Login</NavLink ></li>
                <li className="{% if request.path == '/sign-up/' %}active {% endif %}"><NavLink to="/sign-up">Register</NavLink ></li>
                <li className="{% if request.path == '/' %}active {% endif %}"><NavLink to="/">Logout</NavLink ></li>
              </ul>
            </nav>
          </header>
          <div style={{backgroundColor: '#f1f1f1'}}>
            <hr />
          </div></div>
      );
    }
export default Navi;