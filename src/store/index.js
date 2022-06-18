import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./cart-slice";
import AuthSlice from './auth-slice';

const store = configureStore({
    reducer:{
        cart : CartSlice.reducer,
        auth : AuthSlice.reducer
    }
})

export default store;