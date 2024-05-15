import { createSlice } from "@reduxjs/toolkit";


let initialState = []

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // add to cart reducer
        addToCart(state, action) {
            return [...state, action.payload]
        },
        removeFromCart(state, action) {
            return state = state.filter(cartItem => cartItem._id.$oid != action.payload._id.$oid)
        },
        clearCart(state, _ ) {
            return state = []
        }
    }
})


export const cartSelector = state => state.cart;

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;