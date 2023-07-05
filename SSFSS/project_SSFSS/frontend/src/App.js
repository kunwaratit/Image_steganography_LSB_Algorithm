
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React from 'react';
//import NavBar from './components/NavBar';
import {Routes,Route} from 'react-router-dom'
import Navi from './components/Navi';

import Home from './Home';






class App extends React.Component{

  state={details:[],}

  componentDidMount(){

    let data;
    axios.get('http://localhost:8000')
      .then(res=> {
        data=res.data;
        this.setState({
          details: data
        });
  
      })
      .catch(err=>{ })


  }
  render(){
    return (

    <div> 
      <Navi/>
      <>
  <Routes>
    <Route path='/home' element= {<Home />} />
   
    
  </Routes>
  </>
      
      
      
      
      
      <div> 
      <header><h1>Data From the database through the api
      </h1></header>
       <hr/>
        {this.state.details.map((output,id)=>(
          <div key={id}>
            <div>
              <h2>{output.employee}</h2>
              <h2>{output.department}</h2>
            </div> 
          </div>
          
        ))
        }
      </div>
      </div>)}
}
export default App;
