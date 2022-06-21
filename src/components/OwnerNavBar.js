import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {Navbar, Nav, Container} from '../react-bootstrap/component';
import {useDispatch, useSelector} from 'react-redux';
import {AuthAction} from '../store/auth-slice.js'
import Cart from "./Cart";
import "../styles/NavBar.css";

const OwnerNavBar = () => {

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
              <NavLink className="navlink" to="/menu">
                Menu
              </NavLink>
              <NavLink className="navlink" to="/request">
                Order Request
              </NavLink>
            </Nav>
            <Nav>
              <Cart />
              {isLoggedIn && (
                <NavLink className="navlink" to="/" onClick={onLogout}>
                  Log Out
                </NavLink>
              )}
              {/* {!isLoggedIn && (
                <>
                  <NavLink className="navlink" to="/login">
                    Log In
                  </NavLink>
                  <NavLink className="navlink" to="/signup">
                    Sign Up
                  </NavLink>
                </>
              )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
   
   </>
  )
}

export default OwnerNavBar