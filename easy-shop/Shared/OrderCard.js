import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import TrafficLight from "./StyledComponents/TrafficLight";
import EasyButton from "./StyledComponents/EasyButton";
import Toast from "react-native-toast-message";


import axios from "axios";
import baseURL from "../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";


const codes = [
    { name: "pending", code: "3" },
    { name: "shipped", code: "2" },
    { name: "delivered", code: "1" },
];

const OrderCard = (props) => {
    const [orderStatus, setOrderStatus] = useState();
    const [statusText, setStatusText] = useState();
    const [statusChange, setStatusChange] = useState();
    const [token, setToken] = useState();
    const [cardColor, setCardColor] = useState();

        
    useEffect(() => {
        if (props.editMode) {
            AsyncStorage.getItem("jwt")
                .then((res) => {
                setToken(res);
                })
                .catch((error) => console.log(error));
        }

        if (props.status == "3") {
            setOrderStatus(<TrafficLight unavailable></TrafficLight>);
            setStatusText("pending");
            setCardColor("#E74C3C");
        } else if (props.status == "2") {
            setOrderStatus(<TrafficLight limited></TrafficLight>);
            setStatusText("shipped");
            setCardColor("#F1C40F");
        } else {
            setOrderStatus(<TrafficLight available></TrafficLight>);
            setStatusText("delivered");
            setCardColor("#2ECC71");
        }

        return () => {
            setOrderStatus();
            setStatusText();
            setCardColor();
        };

    }, []);

    return (
        <View style={[{ backgroundColor: cardColor }, styles.container]}>
            <View style={styles.container}>
                <Text>Order Number: #{props.id}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text>
                    Status: {statusText} {orderStatus}
                </Text>
                <Text>
                    Address: {props.shippingAddress1} {props.shippingAddress2}
                </Text>
                <Text>City: {props.city}</Text>
                <Text>Country: {props.country}</Text>
                <Text>Date Ordered: {props.dateOrdered.split("T")[0]}</Text>
                <View style={styles.priceContainer}>
                    <Text>Price: </Text>
                    <Text style={styles.price}>$ {props.totalPrice}</Text>
                </View>
                
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={statusChange}
                    placeholder="Change Status"
                    placeholderIconColor={{ color: "#007aff" }}
                    onValueChange={(e) => setStatusChange(e)}
                >
                {codes.map((c) => {
                    return (
                        <Picker.Item key={c.code} label={c.name} value={c.code} />
                    );
                })}
                </Picker>
                
                <EasyButton secondary large onPress={() => updateOrder()}>
                    <Text style={{ color: "white" }}>Update</Text>
                </EasyButton>

            </View>
        </View>
    )
    
}


const styles = StyleSheet.create({
    container: {
      padding: 20,
      margin: 10,
      borderRadius: 10,
    },
    title: {
      backgroundColor: "#62B1F6",
      padding: 5,
    },
    priceContainer: {
      marginTop: 10,
      alignSelf: "flex-end",
      flexDirection: "row",
    },
    price: {
      color: "white",
      fontWeight: "bold",
    },
})

export default OrderCard;