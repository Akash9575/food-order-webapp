import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartData, sendCartData } from "./store/actions/cart-actions";
import { USER_ROLES, END_POINTS } from "./constants/constant";
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
import { ProgressBar } from "./components/Customer/ProgressBar";

function App() {
  const dispatch = useDispatch();

  const role = useSelector((state) => state.auth.role);
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = useSelector((state) => state.cart);

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
        {role === USER_ROLES.RESTURANT_OWNER && <OwnerNavBar />}
        {role === USER_ROLES.CUSTOMER && <NavBar />}
        {role === USER_ROLES.DELIVERY_MEN && <DeliveryNavbar />}
        <Routes>
          <Route path={END_POINTS.BASE} element={<Home />} />
          <Route path={END_POINTS.LOGIN} element={<LoginModal />} />
          <Route path={END_POINTS.SIGNUP} element={<SignUpModal />} />
          <Route path={END_POINTS.RESTAURANT_NAME} element={<Restaurant />} />

          <Route
            path={END_POINTS.ORDER_REQUEST}
            element={
              <Protected role={USER_ROLES.RESTURANT_OWNER} Component={Request} />
            }
          />
          <Route
            path={END_POINTS.RESTAURANT_MENU}
            element={
              <Protected role={USER_ROLES.RESTURANT_OWNER} Component={StoreMenu} />
            }
          />
          <Route
            path={END_POINTS.REGISTER_RESTAURANT}
            element={
              <Protected
                role={USER_ROLES.RESTURANT_OWNER}
                Component={RegisterRestaurant}
              />
            }
          />
          <Route
            path={END_POINTS.ADD_ITEM}
            element={
              <Protected role={USER_ROLES.RESTURANT_OWNER} Component={AddItem} />
            }
          />

          <Route
            path={END_POINTS.DELIVERY_REQUESTS}
            element={
              <Protected
                role={USER_ROLES.DELIVERY_MEN}
                Component={DeliveryRequests}
              />
            }
          />
          <Route
            path={END_POINTS.REGISTER_DELIVERY_MEN}
            element={
              <Protected
                role={USER_ROLES.DELIVERY_MEN}
                Component={RegisterDeliveryMan}
              />
            }
          />
          <Route
            path={END_POINTS.ACCEPTED_ORDERS}
            element={
              <Protected role={USER_ROLES.DELIVERY_MEN} Component={AcceptedOrders} />
            }
          />

          <Route
            path={END_POINTS.CUSTOMER_ORDERS}
            element={
              <Protected role={USER_ROLES.CUSTOMER} Component={CustomerOrders} />
            }
          />
          {/* <Route
            path={END_POINTS.CUSTOMER_PROGRESS_BAR}
            element={
              <Protected role={USER_ROLES.CUSTOMER} Component={ProgressBar} />
            }
          /> */}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;