import React, { useCallback, useEffect, useState } from "react"
import { View as V, Text as T, ActivityIndicator as AI, StyleSheet as SS, Dimensions as D, Button as B, FlatList } from "react-native"
import { Header, Item, Input } from "native-base"
import Icon from "react-native-vector-icons/FontAwesome"
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import baseURL from "../../assets/common/baseUrl"
import ListItem from "./ListItem"


var { height, width } = D.get("window")


const ListHeader = () => {
    return(
        <V
            elevation={1}
            style={styles.listHeader}
        >
            <V style={styles.headerItem}></V>
            <V style={styles.headerItem}>
                <T style={{ fontWeight: '600'}}>Brand</T>
            </V>
            <V style={styles.headerItem}>
                <T style={{ fontWeight: '600'}}>Name</T>
            </V>
            <V style={styles.headerItem}>
                <T style={{ fontWeight: '600'}}>Category</T>
            </V>
            <V style={styles.headerItem}>
                <T style={{ fontWeight: '600'}}>Price</T>
            </V>
        </V>
    )
}

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
            <V>
                <Header searchBar rounded>
                    <Item style={{ padding: 5 }}>
                        <Icon name="search" />
                        <Input 
                            placeholder="Search"
                            onChangeText={(text) => searchProduct(text)}
                        />
                    </Item>
                </Header>
            </V>
            {loading ? (
                <V> 
                    <AI size="large" color="red" />
                </V>
            ) : (
                <FlatList 
                    data={productFilter}
                    ListHeaderComponent={ListHeader}
                    renderItem={({ item, index }) => (
                        <ListItem
                            {...item}
                            index={index}
                            navigation={props.navigation}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            )}
        </V>
    )
}


const styles = SS.create({
    listHeader: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: width / 6
    },
    spinner: {
        height: height / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
})


export default Products;