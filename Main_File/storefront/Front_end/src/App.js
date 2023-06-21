import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import Upload from './Upload';
import Home from './Home';
import Contact from './Contact';
import { Router, Route, Routes } from 'react-router-dom';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm =(formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element= {  <Home />} />
        <Route path='/upload' element= {<Upload />} />
        <Route path='/contact' element= {<Contact />} />
        <Route path='/login' element={
        currentForm == "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      } />
      
      </Routes>
     
      
      

      
    </div>
  );
}

export default App;
