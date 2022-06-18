import {useState} from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import Home from './component/Home';
import LoginModal from "./component/LoginModal";
import SignUpModal from "./component/SignUpModal";
import "./App.css";
import RegisterRestaurant from "./component/RegisterRestaurant";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { sendCartData } from './store/CartSendDataAction';
import { fetchCartData } from './store/CartSendDataAction';
import { useDispatch } from 'react-redux';
import Restaurant from './component/Restaurant';

function App() {

  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCartData())
  },[dispatch])

  useEffect(() => {
    dispatch(sendCartData(cart))
    console.log(JSON.stringify({
      items:{...cart.items},
      totalCartPrice:cart.totalCartPrice,
      totalQuantity:cart.totalQuantity
    }))
  },[cart,dispatch])

  return (
    <div className="App">
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
  );
}

export default App;
