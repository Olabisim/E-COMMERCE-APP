import React from 'react'
import { useSelector } from 'react-redux';
import {View as V, StyleSheet as SS, Dimensions as D, Text as T, ActivityIndicator, FlatList as FL, Image as I, Button as B } from 'react-native';

function Cart() {

    const cartItems = useSelector(state => state.cart)

    console.log("cartItems")
    console.log(cartItems)

    return (
        <V style={{flex: 1}}>
            {cartItems.map(x => {
                return (
                    <T>{x.name}</T>
                )
            })}
        </V>
    )
}

export default Cart;