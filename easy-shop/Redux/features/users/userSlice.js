import { createSlice } from "@reduxjs/toolkit";
import isEmpty from "../../../assets/common/is-empty";


let initialState = {
    isAuthenticated: [],
    user: [],
    userProfile: []
}

const userSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        setCurrentUserRTK(state, action) {
            state.isAuthenticated = !isEmpty(action.payload.user)
            state.user = action.payload.user;
            state.userProfile = action.payload.userProfile;
        }

        // add to cart reducer
        // addToCart(state, action) {
        //     return [...state, action.payload]
        // },
        // removeFromCart(state, action) {
        //     return state = state.filter(cartItem => cartItem._id.$oid != action.payload._id.$oid)
        // },
        // clearCart(state, _ ) {
        //     return state = []
        // }
    }
})


// export const cartSelector = state => state.cart;

export const {setCurrentUserRTK} = userSlice.actions;

export default userSlice.reducer;