
import React from 'react'
import Login from '../Screen/User/Login'
import Register from '../Screen/User/Register'
import UserProfile from '../Screen/User/UserProfile'

// stacks
import { createStackNavigator } from '@react-navigation/stack'


const Stack = createStackNavigator()

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="User Profile"
                component={UserProfile}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
} 

export default function UserNavigator() {
    return <MyStack />
}