import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './Login';
import { Register } from './Register';
import Upload from './Upload';
import Home from './Home';
import Contact from './Contact';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm =(formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      <div><Upload /></div>
      
      {
        currentForm == "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }

      <Contact />
    </div>
  );
}

export default App;
