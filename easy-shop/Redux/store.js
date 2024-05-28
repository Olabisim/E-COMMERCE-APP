
import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './features/carts/cartSlice'
import userReducer from './features/users/userSlice'


export default configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer
    }
})