import { createSlice } from "@reduxjs/toolkit";

const initialDeliveryState = {
   
}

const DeliverySlice = createSlice({
    name:'delivery',
    initialState: initialDeliveryState,
    reducers:{
       
    }
})

export const DeliveryAction = DeliverySlice.actions;

export default DeliverySlice;