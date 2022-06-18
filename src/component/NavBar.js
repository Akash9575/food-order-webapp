import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {Navbar, Nav, Container} from '../react-bootstrap/component';
import {useDispatch, useSelector} from 'react-redux';
import {AuthAction} from '../store/auth-slice.js'
import '../styles/NavBar.css';

const NavBar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(AuthAction.getToken());
    dispatch(AuthAction.checkLogin());
  }, []);

  const onLogout = () => {
    dispatch(AuthAction.removeToken());
    dispatch(AuthAction.checkLogin());
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
            </Nav>
            <Nav>
              <NavLink className="navlink" to="/registerrestaurant">
                Register Restaurant
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
