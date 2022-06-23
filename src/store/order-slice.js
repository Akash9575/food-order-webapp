import { createSlice } from "@reduxjs/toolkit";

const initialOrderState = {
    pending_orders:[],
}

const OrderSlice = createSlice({
    name:'order',
    initialState: initialOrderState,
    reducers:{
        replacePendingOrderData(state,action){
            state.pending_orders = action.payload.pending_orders;
        },
    }
})

export const OrderAction = OrderSlice.actions;

export default OrderSlice;