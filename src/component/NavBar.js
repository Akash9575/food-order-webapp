import React from 'react'
import {Navbar, Nav, Container} from '../react-bootstrap/component';
import {NavLink} from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/">Food Order</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink className='navlink' to="/">Home</NavLink>
              <NavLink className='navlink' to="/about">About</NavLink>
              <NavLink className='navlink' to="/contact">Contact</NavLink>
            </Nav>
            <Nav>
              <NavLink className='navlink' to="/registerrestaurant">Register Restaurant</NavLink>
              <NavLink className='navlink' to="/login">Log In</NavLink>
              <NavLink className='navlink' to="/signup"> Sign Up </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar