import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./Navbar.css";

const CustomNavbar = ({ username, onLogout }) => {
  return (
    <Navbar className="custom-navbar" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#">Notes Keeper</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown title={username || "User"} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
