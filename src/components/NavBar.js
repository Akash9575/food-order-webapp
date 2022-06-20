import React, { useState, useEffect } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {

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
              
            </Nav>
            <Nav>
              <NavLink className="navlink" to="/deliveryrequests">
                Delivery Request
              </NavLink>
              <NavLink className="navlink" to="/acceptedorders">
                Accepted Orders
              </NavLink>
              {console.log(isLoggedIn)}
              {isLoggedIn && (
                <NavLink className="navlink" to="/" onClick={onLogout}>
                  Log Out
                </NavLink>
              )}
              {!isLoggedIn && (
                <>
                  <NavLink className="navlink" to="/login">
                    Log In
                  </NavLink>
                  <NavLink className="navlink" to="/signup">
                    Sign Up
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;