import React, {useEffect, useState} from 'react'
import {View as V, StyleSheet as SS, Text as T, ActivityIndicator, FlatList as FL,  Dimensions as D } from 'react-native'
import {Content, Left, Body, ListItem, Thumbnail, Text} from 'native-base'

const SearchedProduct = (props) => {
    const {productsFiltered} = props
    return (
        <Content>
            {productsFiltered.length > 0 ? 
            (
                productsFiltered.map*((item => (
                    <ListItem   
                        key={item._id}
                        // key={item._id.$oid}
                        avatar
                    >
                        <Left>
                            <Thumbnail            
                                source={{uri: item.image ? item.image :'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }}
                            />
                        </Left>
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.description}</Text>
                        </Body>
                    </ListItem>
                )))
            )
            :
            (
                <V style={styles.center}>
                    <T style={{alignSelf: 'center'}}>
                        No products match the selected criteria. 
                    </T>
                </V>
            )}
        </Content>
    )
}

const styles = SS.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default SearchedProduct;