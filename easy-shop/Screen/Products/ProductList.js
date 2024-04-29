import React, {useEffect, useState} from 'react'
import {View as V, StyleSheet, Text as T, ActivityIndicator, FlatList as FL, TouchableOpacity as TO } from 'react-native';

// we can get wdith and height of the dimension 
var {width}  = Dimensions.get('window')

const ProductList = (props) => {
    return (
        <TO style={{width: '50%'}}>
            {/*  */}
            <V style={{width: width / 2, backgroundColor: 'gainsboro'}}>
                    
            </V>

        </TO>
    )
}

export default ProductList;