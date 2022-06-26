import { createSlice } from "@reduxjs/toolkit";

const initialOrderState = {
    pending_orders:[],
    customer_orders : []
}

const OrderSlice = createSlice({
    name:'order',
    initialState: initialOrderState,
    reducers:{
        replacePendingOrderData(state,action){
            state.pending_orders = action.payload.pending_orders;
        },
        replaceCustomerOrderData(state, action){
            state.customer_orders = action.payload.customer_orders;
        }
    }
})

export const OrderAction = OrderSlice.actions;

export default OrderSlice;