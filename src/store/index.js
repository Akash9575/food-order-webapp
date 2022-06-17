import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./Cart-reducer";

const store = configureStore({
    reducer:{
        cart : CartSlice.reducer
    }
})

export default store;