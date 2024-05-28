import React, { useCallback, useEffect, useState } from "react"
import { View as V, Text as T, ActivityIndicator as AI, StyleSheet as SS, Dimensions as D, Button as B } from "react-native"
import { Header, Item, Input } from "native-base"
import Icon from "react-native-vector-icons/FontAwesome"
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"


var { height, width } = D.get("window")

const Products = (props) => {
    
    const [productList, setProductList] = useState();
    const [productFilter, setProductFilter] = useState();
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();

    useFocusEffect(
        useCallback( () => {
            // Get Token from async storage
            AsyncStorage.getItem("jwt")
                .then((res) => {
                    setToken(res)
                })
                .catch((error) => console.log(error))

            axios
                .get(`${baseURL}products`)
                .then((res) => {
                    setProductList(res.data.data);
                    setProductFilter(res.data.data);
                    setLoading(false);
                })

            return () => {
                setProductList();
                setProductFilter();
                setLoading(true);
            }
        }, [],
        )
    )

    return (
        <V>
            <T>Products Screen</T>
        </V>
    )
}

export default Products;