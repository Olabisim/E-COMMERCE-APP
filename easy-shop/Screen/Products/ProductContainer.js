import React, {useEffect, useState} from 'react'
import {View as V, StyleSheet, Text as T, ActivityIndicator, FlatList as FL } from 'react-native'

const data = require('../../assets/data/products.json')

const ProductContainer = () => {

    const [ products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(data)

        return () => {
            setProducts([])
        }
    }, [])



    return (
        <V> 
            <T>Product Container</T>
            <V style={{marginTop: 100}}>
                <FL 
                    horizontal
                    data={products}
                    renderItem={({item}) => <T>{item.brand}</T>}
                    keyExtractor={item => item.name}
                />
            </V>
        </V>
    )
}

export default ProductContainer;