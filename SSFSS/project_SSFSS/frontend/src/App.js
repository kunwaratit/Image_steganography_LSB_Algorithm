
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import React from 'react';
import NavBar from './components/NavBar';
import {Routes,Route} from 'react-router-dom'
import Navi from './components/Navi';

import Home from './Home';
import About from './About';
import Nab from './Nab';




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
      <Nab/>
      <>
  <Routes>
    <Route path='/home' element= {<Home />} />
    <Route path='/about' element= {<About/>} />
    
  </Routes>
  </>
      
      
      
      
        <div> 
          <div  className='border-bottom border-1' >
          
          <NavBar />

        </div></div>
      
      <div> 
      <header>Data</header>
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
