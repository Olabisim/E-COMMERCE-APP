import React, {useEffect, useState} from 'react'
import {View as V, StyleSheet, Text as T, ActivityIndicator, FlatList as FL,  Dimensions as D } from 'react-native'
// import {Icon} from 'native-base'
import {Container, Header, Icon, Item, Input, Text} from 'native-base'
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

        <Container> 
        
        <Header searchBar rounded>
            <Item>
                <Icon name="ios-search" />
                <Input 
                    placeholder="Search"
                    // onFocus={}
                    // onChangeText={(text) => }
                />
            </Item>
        </Header>
            
        <V style={{marginTop: 30, flex: 1, justifyContent: 'flex-end', alignContent: 'flex-end', alignItems: 'center'}}> 
            <T>Product Container</T>
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
        
        </Container>

    )
}

export default ProductContainer;