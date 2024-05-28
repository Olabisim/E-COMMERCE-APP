import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import CheckoutNavigator from './CheckoutNavigator'
import Categories from '../Screen/Admin/Categories'
import Orders from '../Screen/Admin/Order'
import ProductForm from '../Screen/Admin/ProductForm'
import Products from '../Screen/Admin/Products'


const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Products"
                component={Products}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Categories"
                component={Categories}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Orders"
                component={Orders}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="ProductForm"
                component={ProductForm}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function AdminNavigator() {
    return <MyStack />
}