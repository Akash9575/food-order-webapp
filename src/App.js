import { Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import Home from './component/Home';
import "./App.css";
import Restaurant from "./component/Restaurant";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { sendCartData } from './store/CartSendDataAction';
import { fetchCartData } from './store/CartSendDataAction';
import { useDispatch } from 'react-redux';

function App() {

  const cart = useSelector(state => state.cart)

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
    <div className="App">
       <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<NavBar />} />
        <Route path="/contact" element={<NavBar />} />
        <Route path="/registerrestaurant" element={<NavBar/>} />
        <Route path="/login" element={<NavBar />} />
        <Route path="/signup" element={<NavBar />} />
        <Route path="/:restaurant_name" element={<Restaurant/>} />
      </Routes>
    </div>
  );
}

export default App;
