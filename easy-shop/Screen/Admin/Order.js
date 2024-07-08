import React, { useState, useCallback} from "react"
import { View, FlatList, Text} from "react-native"
import axios from "axios"
import baseURL from "../../assets/common/baseUrl"
import { useFocusEffect } from "@react-navigation/native"
import OrderCard from "../../Shared/OrderCard"

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

const Orders = (props) => {
    
    const [orderList, setOrderList] = useState();
    
    useFocusEffect(
        useCallback(
            () => {
                getOrders();
            return () => {
                setOrderList();
            }
            },
            [],
        )
    )


    const getOrders = () => {
        axios
            .get(`${baseURL}orders`)
            .then((x) => {
                setOrderList(x.data);
            })
            .catch((error) => console.log(error))
    }

    return (
        <View>
            <Text>This is some data</Text>
            <FlatList 
                data={orderList?.data}
                renderItem={({ item }) => (
                    
                    <OrderCard navigation={props.navigation} {...item} editMode={true}/>
                )}
                keyExtractor={(item) => item.id}
            />
            <Text>This is some data</Text>
        </View>
    )
}

export default Orders;