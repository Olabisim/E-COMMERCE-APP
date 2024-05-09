
import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './features/carts/cartSlice'


export default configureStore({
    reducer: {
        cart: cartReducer
    }
})