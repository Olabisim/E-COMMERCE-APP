
import React from 'react'
import ProductContainer from '../Screen/Products/ProductContainer'
import SingleProduct from '../Screen/Products/SingleProduct'

// stacks
import { createStackNavigator } from '@react-navigation/stack'


const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeMain"
                component={ProductContainer}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Product Detail"
                component={SingleProduct}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
} 

export default function HomeNavigator() {
    return <MyStack />
}