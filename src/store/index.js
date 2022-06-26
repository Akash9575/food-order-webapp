import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/auth-slice";
import CartSlice from "./slices/cart-slice";
import OrderSlice from "./slices/order-slice";
import DeliverySlice from "./slices/delivery-slice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    cart: CartSlice.reducer,
    order: OrderSlice.reducer,
    delivey: DeliverySlice.reducer,
  },
});

export default store;
