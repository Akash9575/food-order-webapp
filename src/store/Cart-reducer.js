import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    items:[],
    totalQuantity:0,
    totalCartPrice:0
}

const CartSlice = createSlice({
    name:'cart',
    initialState:initialCartState,
    reducers:{
        replaceCartData(state,action){
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
        },
        addItemtoCart(state,action){
            const newItem = action.payload
            const existingItem = state.items.find(item => item.id === newItem.id)
            state.totalQuantity++;
            state.totalCartPrice = state.totalCartPrice + +newItem.price;

            if(!existingItem){
                state.items.push({
                    id:newItem.id,
                    price:+newItem.price,
                    quantity:1,
                    totalPrice: +newItem.price,
                    name:newItem.title
                })
            }else{
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + +newItem.price;
            }
        },
        removeItemFromCart(state,action){
            state.totalQuantity--;
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id)

            state.totalCartPrice = state.totalCartPrice - +existingItem.price;
            if(existingItem.quantity === 1 ){
                state.items = state.items.filter((item) => item.id !== id)
            }else{
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - +existingItem.price
            }
        }
    }
})

export const CartAction = CartSlice.actions;

export default CartSlice;