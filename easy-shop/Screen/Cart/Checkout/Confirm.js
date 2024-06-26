import React from 'react'
import { StyleSheet as SS, Image as I, SafeAreaView as SAV, View as V, Dimensions as D, Text as T, ScrollView as SV, Button as B } from 'react-native';
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";
import { clearCart } from '../../../Redux/features/carts/cartSlice';
import { useDispatch } from 'react-redux';

import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";

var {height, width} = D.get('window')

const Confirm = (props) => {

    const dispatch = useDispatch()

    // extra porperties passed from the checkout page
    const finalOrder = props.route.params;

    const  confirmOrder = () => {

        const order = finalOrder.order.order;

        console.log('order')
        console.log(order)

        
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        };

        
        axios
            .post(`${baseURL}orders`, order, config)
            .then((res) => {
                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Order Completed",
                        text2: "",
                    });
                    setTimeout(() => {
                        clearCart();
                        props.navigation.navigate("Cart");
                    }, 500);
                }
            })
            .catch((error) => {
                console.log('error')
                console.log(error)
                Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Something went wrong",
                text2: "Please try again",
                });
            });

        setTimeout(() => {
            dispatch(clearCart());
            props.navigation.navigate("CartHome")
        }, 500)
    }

    return (
        <SV contentContainerStyle={styles.container}>
            <V style={styles.titleContainer}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>

                {
                props.route.params 
                && 
                (
                    <V style={{ borderWidth: 1, borderColor: "orange" }}>
                        <Text style={styles.title}>Shipping to:</Text>
                        <V style={{ padding: 8 }}>
                            <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
                            <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
                            <Text>City: {finalOrder.order.order.city}</Text>
                            <Text>Zip Code: {finalOrder.order.order.zip}</Text>
                            <Text>Country: {finalOrder.order.order.country}</Text>
                        </V>
                        <Text style={styles.title}>Items:</Text>
                        {/* CHANGE THIS */}
                        {/* {productUpdate && (
                        <>
                            {productUpdate.map((x) => {
                            return (
                                <ListItem style={styles.listItem} key={x.name} avatar>
                                    <Left>
                                        <Thumbnail source={{ uri: x.image }} />
                                    </Left>
                                    <Body style={styles.body}>
                                        <Left>
                                        <Text>{x.name}</Text>
                                        </Left>
                                        <Right>
                                        <Text>$ {x.price}</Text>
                                        </Right>
                                    </Body>
                                </ListItem>
                            );
                            })}
                        </>
                        )} */}
                        {finalOrder?.order?.order.orderItems.map((x) => {
                            return (
                                <ListItem style={styles.listItem} key={x.name} avatar>
                                    <Left>
                                        <Thumbnail source={{ uri: x.image ? x.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}} />
                                    </Left>
                                    <Body style={styles.body}>
                                        <Left>
                                            <Text>{x.name}</Text>
                                        </Left>
                                        <Right>
                                            <Text>$ {x.price}</Text>
                                        </Right>
                                    </Body>
                                </ListItem>
                            );
                        })}

                    </V>
                )   
                }

                <V style={{ alignItems: "center", margin: 20 }}>
                    <B title={"Place order"} onPress={confirmOrder} />
                </V>
            </V>
        </SV>
    )
}


const styles = SS.create({
    container: {
      height: height,
      padding: 8,
      alignContent: "center",
      backgroundColor: "white",
    },
    titleContainer: {
      justifyContent: "center",
      alignItems: "center",
      margin: 8,
    },
    title: {
      alignSelf: "center",
      margin: 8,
      fontSize: 16,
      fontWeight: "bold",
    },
    listItem: {
      alignItems: "center",
      backgroundColor: "white",
      justifyContent: "center",
      width: width / 1.2, //divides the screen by 1.2 to add some spacing to the left and right when aligning the div
    },
    body: {
      margin: 10,
      alignItems: "center",
      flexDirection: "row",
    },
});


export default Confirm;