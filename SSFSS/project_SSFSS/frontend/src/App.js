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

import EncryptedFilesList from './components/Myfiles'
import Logout from './components/Logout';
import { AuthProvider } from './components/AuthContext'; // Import the AuthProvider
import DecryptionComponent from './components/DecryptionComponent';

import {useEffect } from 'react';

import EncodeImage from './components/EncodeImage';
import DecodeImage from './components/DecodeImage';
import ForgotPassword from "./components/forget";
import FAQSection from "./components/QnA";
import YourPage from "./components/info";

class App extends React.Component{

  render(){
   
    return (
      <AuthProvider>
     
              <Navi/>
            

      
<div>

  <Routes>
  <Route  path='/' element= {<Home/>} />
    <Route  path='/Home' element= {<Home/>} />
    <Route exact path='/Encrypt' element= {<Encrypt/>} />
    <Route exact path='/Myfiles/decrypt' element= {<DecryptionComponent/>} />
    <Route exact path='/Myfiles' element= {<EncryptedFilesList/>} />
    <Route exact path='/Contact' element= {<Contact/>} />
    <Route exact path='/Login' element= {<Login/>} />
    <Route exact path='/Register' element= {<Register/>} />
    <Route exact path="/Forgot" element={<ForgotPassword />} />
    <Route exact path="/QnA" element={<FAQSection />} />
    <Route exact path="/Contactinfo" element={<YourPage />} />
    <Route path="/encode" element= {<EncodeImage/>} />
    <Route path="/decode" element= {<DecodeImage/>} />
    
  </Routes>

      <div> 
        
      
 
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
