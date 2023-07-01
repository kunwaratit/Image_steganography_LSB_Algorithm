import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './nav.css'
function NavBar() {
  return (
  <>
   <Navbar fixed='top' expand="lg" className=" bg-body-white" >
   <Navbar.Brand href="#" className='text-white m-0.2' style={{fontWeight:'bold',marginLeft:'0.5vw'}}>SteganoGraphic Secure File Storage System</Navbar.Brand>
  {// <Navbar.Brand href="#home" style={{marginLeft:'13px'}}>
   //       <table  cellPadding={'0px'} style={{fontSize:'10px',padding:'0vw', marginTop:'0vw',position:'static',color:'white',fontWeight:'900' } } ><tr><td>SteganoGraphic Secure</td></tr>
//<tr>          <td>File Storage System</td></tr></table></Navbar.Brand>
}
      <Container>
       
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">  
        
        <Nav  className="" variant="tabs" defaultActiveKey="/home"style={{marginRight:'0.25vw'}}>
         
          <Nav.Item >
            <Nav.Link href="/home" className='bg-primary text-white'>Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-">Option 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Log Out</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" disabled hidden>
              Log In
            </Nav.Link>
          </Nav.Item>
        </Nav>
        </Navbar.Collapse>
 
        </Container>
        </Navbar>
        <hr className='m-auto'></hr>
    </>
  );
}

export default NavBar;