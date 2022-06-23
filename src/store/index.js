import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './auth-slice';
import CartSlice from "./cart-slice";
import OrderSlice from "./order-slice";

const store = configureStore({
    reducer:{
        auth : AuthSlice.reducer,
        cart : CartSlice.reducer,
        order : OrderSlice.reducer,
    }
})

export default store;