import React, {useEffect, useState} from 'react'
import {View as V, StyleSheet, Text as T, ActivityIndicator, FlatList as FL, TouchableOpacity as TO, Dimensions as D } from 'react-native';
import ProductCard from './ProductCard';

// we can get wdith and height of the dimension 
var {width}  = D.get("window")

const ProductList = (props) => {

    const {item} = props;

    return (
        // <TO style={{width: '50%', flex: 1}}>
        <TO style={{width: '50%'}}>
            {/*  */}
            <V style={{width: width / 2.5, flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                <ProductCard {...item} />
            </V>

        </TO>
    )
}

export default ProductList;