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
        </View>
    )
    
}


const styles = StyleSheet.create({
    container: {
      padding: 20,
      margin: 10,
      borderRadius: 10,
    },
})

export default OrderCard;