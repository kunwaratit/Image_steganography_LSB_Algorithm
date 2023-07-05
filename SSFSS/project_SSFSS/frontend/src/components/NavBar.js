//import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import './static/navi.css'

function NavBar() {
  return (
  <div >
 
   <Navbar   expand="lg" className="bg-body" >
   <Navbar.Brand href="#home" className='logoO' style={{marginLeft:'13px'}}>
       <table   cellPadding={'0px'} style={{color: 'darkslateblue', marginTop: '-2vw',marginBottom: '-5vw',fontWeight: '600',fontSize:'18px'} } ><tr><td>SteganoGraphic Secure</td></tr>
<tr>          <td>File Storage System</td></tr></table></Navbar.Brand>

      <Container >
       
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">  
        
        <Nav  variant="tabs" defaultActiveKey="/home"style={{marginRight:'0.25vw'}}>
         
          <Nav.Item >
            <Nav.Link href="/" className='my-custom-button'>Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-" className='text-white nav-Link'>Option 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" className='text-white nav-Link'>Log Out</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="disabled" className='text-white nav-Link' disabled hidden>
              Log In
            </Nav.Link>
          </Nav.Item>
        </Nav>
        </Navbar.Collapse>
        
        </Container>
        
        </Navbar>
        
            </div>
  );
}

export default NavBar;