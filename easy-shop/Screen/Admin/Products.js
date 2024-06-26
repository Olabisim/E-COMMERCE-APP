import React, { useCallback, useEffect, useState } from "react"
import { View as V, Text as T, ActivityIndicator as AI, StyleSheet as SS, Dimensions as D, Button as B, FlatList } from "react-native"
import { Header, Item, Input } from "native-base"
import Icon from "react-native-vector-icons/FontAwesome"
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import baseURL from "../../assets/common/baseUrl"
import ListItem from "./ListItem"
import EasyButton from "../../Shared/StyledComponents/EasyButton"


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

    
    const searchProduct = (text) => {
        if (text == "") {
            setProductFilter(productList)
        }
        setProductFilter(
            productList.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    
    const deleteProduct = (id) => {

        console.log('id')
        console.log(id)

        axios
            .delete(`${baseURL}products/${id}`, {
                // headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const products = productFilter.filter((item) => item.id !== id)
                setProductFilter(products)
            })
            .catch((error) => console.log(error));
    }


    return (
        <V style={styles.container}>
            <V style={styles.buttonContainer}>
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("Orders")}
                >
                    <Icon name="shopping-bag" size={18} color="white" />
                    <T style={styles.buttonText}>Orders</T>
                </EasyButton>
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("ProductForm")}
                >
                    <Icon name="plus" size={18} color="white" />
                    <T style={styles.buttonText}>Products</T>
                </EasyButton>
                <EasyButton
                    secondary
                    medium
                    onPress={() => props.navigation.navigate("Categories")}
                >
                    <Icon name="plus" size={18} color="white" />
                    <T style={styles.buttonText}>Categories</T>
                </EasyButton>
            </V>
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
                            delete={deleteProduct}
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
    container: {
        marginBottom: 160,
        backgroundColor: 'white'
    },
    buttonContainer: {
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    }
})


export default Products;