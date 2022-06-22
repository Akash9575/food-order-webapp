import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from '../react-bootstrap/component';
import { useDispatch, useSelector } from 'react-redux';
import { AuthAction } from '../store/auth-slice.js'
import Cart from "./Cart";
import "../styles/NavBar.css";

const DeliveryNavbar = () => {

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
    navigate("/deliverrequests");
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
  );
};

export default DeliveryNavbar;