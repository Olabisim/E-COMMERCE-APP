import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View as V } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import CartIcon from '../Shared/CartIcon';

// stacks
import HomeNavigator from './HomeNavigator';
import CartNavigator from './CartNavigator';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';
import AuthGlobal from '../Context/store/AuthGlobal';


const Tab = createBottomTabNavigator();

const Main = () => {

    const context = useContext(AuthGlobal)

    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                keyboardHidesTabBar: true, 
                showLabel: false, 
                activeTintColor: '#e91e63'
            }}
        >
            <Tab.Screen 
                name='Home'
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon
                            name="home"
                            style={{position: 'relative'}}
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
            <Tab.Screen 
                name='Cart'
                component={CartNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <V>
                            <Icon
                                name="shopping-cart"
                                style={{position: 'relative'}}
                                color={color}
                                size={30}
                            />
                            <CartIcon />
                        </V>
                    )
                }}
            />
            
            {context.stateUser.user.isAdmin == true && (
                <Tab.Screen 
                    name='Admin'
                    component={AdminNavigator}
                    options={{
                        tabBarIcon: ({color}) => (
                            <Icon
                                name="cog"
                                // style={{position: 'relative'}}
                                color={color}
                                size={30}
                            />
                        )
                    }}
                />
             )}

            <Tab.Screen 
                name='User'
                component={UserNavigator}
                options={{
                    tabBarIcon: ({color}) => (
                        <Icon
                            name="user"
                            // style={{position: 'relative'}}
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default Main;