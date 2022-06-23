import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartData, sendCartData } from "./store/cart-actions";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignUpModal";
import RegisterRestaurant from "./components/RegisterRestaurant";
import Restaurant from "./components/Restaurant";
import PendingRequest from "./components/PendingRequest";
import ApprovedRestaurants from "./components/ApprovedRestaurants";
import Customers from "./components/Customers";
import DeliveryMen from "./components/DeliveryMen";
import Protected from "./Protected";
import DeliveryRequests from "./components/DeliveryRequests";
import AcceptedOrders from "./components/AcceptedOrders";
import AddItem from "./components/AddItem";
import StoreMenu from "./components/StoreMenu";
import Request from "./components/Request";
import OwnerNavBar from "./components/OwnerNavBar";
import DeliveryNavbar from "./components/DeliveryNavbar";
import CustomerOrders from './components/CustomerOrders';
import "./App.css";
import RegisterDeliveryMan from "./components/RegisterDeliveryMan";

function App() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const role = useSelector((state) => state.auth.role);
  const user = JSON.parse(localStorage.getItem("user"))
  
  useEffect(() => {
      if(user){
        const user_id = user.id
        dispatch(fetchCartData(user_id));
      }
  }, [dispatch]);

  useEffect(() => {
    if(user){
      const user_id = user.id
      dispatch(sendCartData(cart, user_id));
    }
    // if(user_id) dispatch(sendCartData(cart, user_id));
  }, [cart, dispatch]);

  return (
    <>
      <div className="App">
        {role === "" && <NavBar />}
        {role === "Restaurant Owner" && <OwnerNavBar />}
        {role === "Customer" && <NavBar />}
        {role === "Delivery Men" && <DeliveryNavbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<NavBar />} />
          <Route path="/contact" element={<NavBar />} />
          <Route path="/login" element={<LoginModal />} />
          <Route path="/signup" element={<SignUpModal />} />
          <Route path="/:restaurant_name" element={<Restaurant />} />

          <Route
            path="/request"
            element={<Protected role="Restaurant Owner" Component={Request} />}
          />
          <Route
            path="/menu"
            element={
              <Protected role="Restaurant Owner" Component={StoreMenu} />
            }
          />
          <Route
            path="/addItem"
            element={<Protected role="Restaurant Owner" Component={AddItem} />}
          />
          <Route
            path="/registerrestaurant"
            element={
              <Protected
                role="Restaurant Owner"
                Component={RegisterRestaurant}
              />
            }
          />
          <Route
            path="/pendingrequests"
            element={<Protected role="Admin" Component={PendingRequest} />}
          />
          <Route
            path="/approvedrestaurants"
            element={<Protected role="Admin" Component={ApprovedRestaurants} />}
          />
          <Route
            path="/deliveryperson"
            element={<Protected role="Admin" Component={DeliveryMen} />}
          />
          <Route
            path="/customers"
            element={<Protected role="Admin" Component={Customers} />}
          />

          <Route
            path="/deliveryrequests"
            element={
              <Protected role="Delivery Men" Component={DeliveryRequests} />
            }
          />
          <Route
            path="/registerDeliveryMen"
            element={
              <Protected role="Delivery Men" Component={RegisterDeliveryMan} />
            }
          />
          <Route
            path="/acceptedorders"
            element={
              <Protected role="Delivery Men" Component={AcceptedOrders} />
            }
          />

          <Route
            path="/customerorders"
            element={
              <Protected role="Customer" Component={CustomerOrders} />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
