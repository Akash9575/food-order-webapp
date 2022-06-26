import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {AuthAction} from '../../store/slices/auth-slice'
import {END_POINTS} from '../../constants/constant'
import {Navbar, Nav, Container} from '../../react-bootstrap/component';
import PersonIcon from '@mui/icons-material/Person';
import "../../styles/NavBar.css";

const OwnerNavBar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const username = useSelector((state) => state.auth.username);

  useEffect(() => {
    dispatch(AuthAction.getToken());
    dispatch(AuthAction.checkLogin());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(AuthAction.removeToken());
    dispatch(AuthAction.checkLogin());
    navigate(END_POINTS.RESTAURANT_MENU);
  };

  return (
   <>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="/">Food Order</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="navlink" to={END_POINTS.RESTAURANT_MENU}>
                Menu
              </NavLink>
              <NavLink className="navlink" to={END_POINTS.ORDER_REQUEST}>
                Order Request
              </NavLink>
            </Nav>
            <Nav>
            <p className="text-white navlink"><PersonIcon className="mx-2"/>{username}</p>
              {isLoggedIn && (
                <NavLink className="navlink" to={END_POINTS.BASE} onClick={onLogout}>
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

export default OwnerNavBar