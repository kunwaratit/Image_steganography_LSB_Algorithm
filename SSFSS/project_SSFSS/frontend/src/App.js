
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React from 'react';
//import NavBar from './components/NavBar';
import {Routes,Route} from 'react-router-dom'
import Navi from './components/Navi';
import Home from './components/Home' 
import Login from './components/Login';
import Encrypt from './components/Encrypt';
import Register from './components/Register';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Logout from './components/Logout';

class App extends React.Component{
  render(){
    return (
      <> 
      <Navi/>
      
<div>
  <Routes>
    <Route  path='/Home' element= {<Home/>} />
    <Route exact path='/encrypt' element= {<Encrypt/>} />
    <Route exact path='/contact' element= {<Contact/>} />
    
  <Route exact path='/login' element= {<Login/>} />
    <Route exact path='/register' element= {<Register/>} />
    
  </Routes>
 
      
      
      
      
      
      <div> 
      <header><h1>Data From the database through the api
      </h1></header>
       <hr/>
     {/*   {this.state.details.map((output,id)=>(
          <div key={id}>
            <div>
              <h2>{output.employee}</h2>
              <h2>{output.department}</h2>
            </div> 
          </div>
          
     ))}*/}
        
      </div>
      </div>
       <Footer/>
       </>)}
}
export default App;
