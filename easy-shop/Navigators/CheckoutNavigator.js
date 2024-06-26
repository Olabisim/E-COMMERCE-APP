
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Checkout from '../Screen/Cart/Checkout/Checkout';
import Confirm from '../Screen/Cart/Checkout/Confirm';
import Payment from '../Screen/Cart/Checkout/Payment';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Shipping" component={Checkout} />
            <Tab.Screen name="Payment" component={Payment} />
            <Tab.Screen name="Confirm" component={Confirm} />
        </Tab.Navigator>
    )
}

export default function CheckoutNavigator() {
    return <MyTabs />
}