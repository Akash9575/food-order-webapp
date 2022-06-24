import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartData, sendCartData } from "./store/cart-actions";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import LoginModal from "./components/Auth/LoginModal";
import SignUpModal from "./components/Auth/SignUpModal";
import RegisterRestaurant from "./components/RestaurantOwner/RegisterRestaurant";
import Restaurant from "./components/Restaurant";
import Protected from "./Protected";
import DeliveryRequests from "./components/DeliveryMen/DeliveryRequests";
import AcceptedOrders from "./components/DeliveryMen/AcceptedOrders";
import AddItem from "./components/RestaurantOwner/AddItem";
import StoreMenu from "./components/RestaurantOwner/StoreMenu";
import Request from "./components/RestaurantOwner/Request";
import OwnerNavBar from "./components/RestaurantOwner/OwnerNavBar";
import DeliveryNavbar from "./components/DeliveryMen/DeliveryNavbar";
import CustomerOrders from "./components/Customer/CustomerOrders";
import RegisterDeliveryMan from "./components/DeliveryMen/RegisterDeliveryMan";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const role = useSelector((state) => state.auth.role);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      const user_id = user.id;
      dispatch(fetchCartData(user_id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const user_id = user.id;
      dispatch(sendCartData(cart, user_id));
    }
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
            path="/registerrestaurant"
            element={
              <Protected
                role="Restaurant Owner"
                Component={RegisterRestaurant}
              />
            }
          />
          <Route
            path="/addItem"
            element={<Protected role="Restaurant Owner" Component={AddItem} />}
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
            element={<Protected role="Customer" Component={CustomerOrders} />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
