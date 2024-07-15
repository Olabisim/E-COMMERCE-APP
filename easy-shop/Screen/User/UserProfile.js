import React, {useEffect, useState, useCallback, useContext} from 'react'
import {View as V, StyleSheet as SS, ScrollView as SV, Text as T, FlatList as FL,  Dimensions as D, ActivityIndicator as AI, Button as B } from 'react-native'
import { Container } from "native-base"
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"
import AuthGlobal from '../../Context/store/AuthGlobal'
import AsyncStorage from '@react-native-async-storage/async-storage'
import baseURL from '../../assets/common/baseUrl'
import { logoutUser } from '../../Context/actions/Auth.actions'
import OrderCard from '../../Shared/OrderCard'


const UserProfile = (props) => {

    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()
    const [orders, setOrders] = useState()

    useFocusEffect(
        useCallback(() => {
        if (
            context.stateUser.isAuthenticated === false || 
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("Login")
        }

        axios
        .get(`${baseURL}orders`)
        .then((x) => {
            const data = x.data.data;
            const userOrders = data.filter(
                (order) => order.user._id === context.stateUser.user.userId
            );
            setOrders(userOrders);
        })
        .catch((error) => console.log(error))

        AsyncStorage.getItem("jwt")
            .then((res) => {
                axios
                    .get(`${baseURL}user/${context.stateUser.user.userId}`, {
                        headers: { Authorization: `Bearer ${res}` },
                    })
                    .then((user) => {setUserProfile(user.data.data)})
            })
            .catch((error) => console.log(error))


        return () => {
            setUserProfile();
            setOrders();
        }

    }, [context.stateUser.isAuthenticated]))


    return (
        <Container style={styles.container}>
            <SV contentContainerStyle={styles.subContainer}>
                <T style={{ fontSize: 30 }}>
                   {userProfile ? userProfile.name : "" }
               </T>
               <V style={{ marginTop: 20 }}>
                    <T style={{ margin: 10 }}>
                        Email: {userProfile ? userProfile.email : ""}
                    </T>
                    <T style={{ margin: 10 }}>
                        Phone: {userProfile ? userProfile.phone : ""}
                    </T>
               </V>
               <V style={{ marginTop: 80 }}>
                    <B title={"Sign Out"} onPress={() => [
                        AsyncStorage.removeItem("jwt"),
                        logoutUser(context.dispatch)
                    ]}/>
               </V>
               <V style={styles.order}>
                   <T style={{ fontSize: 20 }}>My Orders</T>
                   <V>
                       {orders ? (
                           orders.map((x) => {
                               return <OrderCard key={x.id} {...x} />;
                           })
                       ) : (
                           <V style={styles.order}>
                               <T>You have no orders</T>
                           </V>
                       )}
                   </V>
               </V>
            </SV>
        </Container>
    )
}


const styles = SS.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    subContainer: {
        alignItems: "center",
        marginTop: 60
    },
    order: {
        marginTop: 20,
        alignItems: "center",
        marginBottom: 60
    }
})

export default UserProfile;