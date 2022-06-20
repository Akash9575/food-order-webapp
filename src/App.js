import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import Home from './component/Home';
import LoginModal from "./component/LoginModal";
import SignUpModal from "./component/SignUpModal";
import RegisterRestaurant from "./component/RegisterRestaurant";
import Restaurant from './component/Restaurant';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartData, sendCartData } from './store/cart-actions';
import "./App.css";

function App() {

  const cart = useSelector(state => state.cart)
  const role = useSelector(state => state.auth.role)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCartData())
    console.log(dispatch(fetchCartData()))
  },[dispatch])

  useEffect(() => {
    dispatch(sendCartData(cart))
    // console.log(JSON.stringify({
    //   items:{...cart.items},
    //   totalCartPrice:cart.totalCartPrice,
    //   totalQuantity:cart.totalQuantity
    // }))
  },[cart,dispatch])


  return (
    <>
    <div className="App">
    {/* {
      (role === 'Customer') && <NavBar />
      (role === 'Admin') && <NavBar />
      (role === 'Delivery Men') && <NavBar />
      (role === 'Restaurant Owner') && <NavBar />
    } */}
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<NavBar />} />
        <Route path="/contact" element={<NavBar />} />
        <Route path="/registerrestaurant" element={<RegisterRestaurant />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/signup" element={<SignUpModal />} />
        <Route path="/:restaurant_name" element={<Restaurant/>} />
      </Routes>
    </div>
    </>
  );
}

export default App;
