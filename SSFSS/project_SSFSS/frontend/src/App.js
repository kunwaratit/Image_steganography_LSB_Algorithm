//app.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React from 'react';
//import NavBar from './components/NavBar';
import {Routes,Route, Router} from 'react-router-dom'
import Navi from './components/Navi';
import Home from './components/Home' 
import Login from './components/Login';
import Encrypt from './components/Encrypt';
import Register from './components/Register';
import Footer from './components/Footer';
import Contact from './components/Contact';

import Logout from './components/Logout';
import { AuthProvider } from './components/AuthContext'; // Import the AuthProvider


import {useEffect } from 'react';
class App extends React.Component{

  render(){
    
    return (
      <AuthProvider>
     
              <Navi/>
            

      
<div>
  <Routes>
    <Route  path='/Home' element= {<Home/>} />
    <Route exact path='/Encrypt' element= {<Encrypt/>} />
    <Route exact path='/Contact' element= {<Contact/>} />
    <Route exact path='/Login' element= {<Login/>} />
    <Route exact path='/Register' element= {<Register/>} />
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
      </AuthProvider>)
       }
}
export default App;
