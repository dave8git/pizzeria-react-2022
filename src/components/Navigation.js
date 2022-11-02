import {Nav, Navbar, Container} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Navigation() {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="mt-4 mb-4 rounded">
          <Container>
          <Navbar.Brand href="#home">Blog</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          <Nav>
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
              <Nav.Link as={NavLink} to="/categories">Categories</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Container>
        
         
        </Navbar>
      

        

    );
  }
  
  export default Navigation;