import React ,{useState} from 'react';
import { Container, Nav, Navbar, NavDropdown,Modal, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import logo from '../img/1.jpg';
import { Link } from 'react-router-dom';

const NavBar = ({ loggedInUser }) => {

  const navigate = useNavigate('');

  const [isLoggedIn, setIsLoggedIn] = useState(!!loggedInUser); // Set initial login state based on loggedInUser prop
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    // Perform logout action
    setShowModal(true);
  };
  const logoutConfirmed = () => {
    // Perform logout action
    setShowModal(false);
    // Update login state to indicate logout
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home or login page after logout
  };
  console.log(loggedInUser);

  let gmailLink = `https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ifkv=ARZ0qKIyG-AnnroBRLzJYiOHtOWFDImF7TIKFrjhtzxXyZlMY4snQh-f_IhOl7tETpdcqVCLvnDj8A&rip=1&sacu=1&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-1123249794%3A1712225361484968&theme=mn&ddm=0`;

  return (
    <div>
      <Navbar expand="lg" className="stark-bg">
        <Container>
          <Navbar.Brand href="#home" className='text-white logo-font'>StArK</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" className='text-white'>Home</Nav.Link>
              <Nav.Link href="#link" className='text-white'>Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown" >
                <NavDropdown.Item href="#action/3.1" >Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2" >Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" >Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" >Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
          {isLoggedIn ? (
                <>
                 <NavDropdown title={loggedInUser.username} id="basic-nav-dropdown" className='mx-5' >
                <NavDropdown.Item href={gmailLink} target='_blank' className='txt-mail fw-bold' >{loggedInUser.email}</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.1" onClick={handleLogout} className='text-danger fw-bold' >Logout</NavDropdown.Item>
              </NavDropdown>
                </>
              ) : (
                <Nav.Link href="/login" className='text-white'>Sign in</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button  className='btn-cancel text-white' variant='none' onClick={() => setShowModal(false)}>Cancel</Button>
          <Button className='btn-confirm text-white ' variant='none' onClick={logoutConfirmed}>Logout</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NavBar;
