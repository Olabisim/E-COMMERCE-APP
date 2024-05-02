import React, {useEffect, useState} from 'react'
import {View as V, StyleSheet, Text as T, ActivityIndicator, FlatList as FL,  Dimensions as D } from 'react-native'
import ProductList from './ProductList';


var {width}  = D.get("window")

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
        <V style={{marginTop: 30, flex: 1, justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'center'}}> 
            <T>Product Container</T>

            {/* <V style={{marginTop: 100, flex: 1, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                <V style={{width: 100, height: 100, backgroundColor: '#fffff0',padding: 5,  margin: 5}}>
                    <T>afsdfsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</T>
                </V>
                <V style={{width: 100, height: 100, backgroundColor: '#fffff0', padding: 5,  margin: 5}}>
                    <T>afsdfsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</T>
                </V>
                <V style={{width: 100, height: 100, backgroundColor: '#fffff0', padding: 5,  margin: 5}}>
                    <T>afsdfsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</T>
                </V>
                <V style={{width: 100, height: 100, backgroundColor: '#fffff0',padding: 5,  margin: 5}}>
                    <T>afsdfsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</T> 
                </V>
                <V style={{width: 100, height: 100, backgroundColor: '#fffff0', padding: 5,  margin: 5}}>
                    <T>afsdfsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</T>
                </V>

                <V style={{width: 100, height: 100, backgroundColor: '#fffff0', padding: 5,  margin: 5}}>
                    <T>afsdfsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</T>
                </V>
            </V> */}


            <V style={{marginTop: 20, flex: 1, width, flexDirection: 'row', flexWrap: 'wrap', alignContent: 'flex-end', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <FL 
                    numColumns={2}
                    // horizontal
                    data={products}
                    renderItem={({item}) => <ProductList key={item.id} item={item} />}
                    keyExtractor={item => item.name}
                />
            </V>
        </V>
    )
}

export default ProductContainer;