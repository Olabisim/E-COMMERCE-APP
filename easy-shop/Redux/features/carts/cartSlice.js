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
            return state.filter(cartItem => cartItem !== action.payload)
        },
        clearCart(state, _ ) {
            return state = []
        }
    }
})

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;