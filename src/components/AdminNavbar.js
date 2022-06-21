import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
} from "../react-bootstrap/component";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavBar.css";

const AdminNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
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
            <Nav className="me-auto"></Nav>
            <Nav>
              {isLoggedIn && (
                <>
                  <NavLink className="navlink" to="/pendingrequests">
                    Pending Requests
                  </NavLink>
                  <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item style={{backgroundColor: 'black'}}>
                      <NavLink className="navlink" to="/approvedrestaurants">Restaurants</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item style={{backgroundColor: 'black'}}>
                      <NavLink className="navlink" to="/deliveryperson">Delivery Men</NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item style={{backgroundColor: 'black'}}>
                      <NavLink className="navlink" to="/customers">Customers</NavLink>
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavLink className="navlink" to="/" onClick={onLogout}>
                    Log Out
                  </NavLink>
                </>
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

export default AdminNavbar;
