import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Checkout from '../Screen/Cart/Checkout'
import Cart from '../Screen/Cart/Cart'


const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CartHome"
                component={Cart}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Checkout"
                component={Checkout}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function CartNavigator() {
    return <MyStack />
}