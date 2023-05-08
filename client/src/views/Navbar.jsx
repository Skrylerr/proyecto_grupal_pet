import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function NavbarComponent({ handleLogout }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState(JSON.parse(sessionStorage.getItem('USUARIO')));

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  function isActivePath(path) {
    return location.pathname.startsWith(path);
  }

  function handleLogoutClick() {
    sessionStorage.removeItem('USUARIO');
    setLoggedUser(null);
    handleLogout();
  }
  
  return (
    <React.Fragment>
      <Navbar bg="primary" variant="dark" expand="md">
        <Container>
          <Navbar.Brand as={Link} to="/">Pet Society</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" active={isActivePath('/')}>Home</Nav.Link>
              <Nav.Link as={Link} to="/pets/new" active={isActivePath('/pets/new')}>Adoption</Nav.Link>
              <NavDropdown title="Pets" id="pets-dropdown">
                <NavDropdown.Item as={Link} to="/pets" active={isActivePath('/pets')}>All Pets</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/pets/:userId" active={isActivePath('/pets/:userId')}>My Pets</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {loggedUser ? (
                <React.Fragment>
                  <NavDropdown title={`Welcome, ${loggedUser.name} ${loggedUser.lastName}`} id="user-dropdown">
                    <NavDropdown.Item onClick={handleLogoutClick}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Nav.Link as={Link} to="/registro">Register</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default NavbarComponent;
