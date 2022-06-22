import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {Navbar, Nav, Container} from '../react-bootstrap/component';
import Cart from "./Cart";
import "../styles/NavBar.css";

const CustomerNavBar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      console.log(token)
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);
  
    const onLogout = () => {
      localStorage.removeItem("token", "user");
      setIsLoggedIn(false);
      navigate("/");
    };

  return (
    <>
           <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/">Food Order</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="navlink" to="/">
                Home
              </NavLink>
              <NavLink className="navlink" to="/about">
                About
              </NavLink>
              <NavLink className="navlink" to="/contact">
                Contact
              </NavLink>
              <NavLink className="navlink" to="/progressbar">
                ProgressBar
              </NavLink>
            </Nav>
            <Nav>
                <Cart />
              {isLoggedIn && (
                <NavLink className="navlink" to="/" onClick={onLogout}>
                  Log Out
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    
    </>
  )
}

export default CustomerNavBar