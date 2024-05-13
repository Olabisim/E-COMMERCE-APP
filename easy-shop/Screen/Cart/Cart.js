import React from 'react'
import { useSelector } from 'react-redux';
import {View as V, StyleSheet as SS, Dimensions as D, Text as T, ActivityIndicator, FlatList as FL, Image as I, Button as B, TouchableOpacity as TO } from 'react-native';
import {Container, Text, Left, Right, H1, ListItem, Thumbnail, Body}  from 'native-base'
import { cartSelector } from '../../Redux/features/carts/cartSlice';


var {height, width} = D.get("window")

function Cart(props) {

    const cartItems = useSelector(cartSelector)

    let total = 0;

    cartItems.forEach(cart => {
        return (total += cart.price)
    })

    return (
        <>
            {
                cartItems.length 
                ? 
                (
                    <Container>
                            <H1 style={{alignSelf: "center"}}>Cart</H1>
                            
                            {cartItems.map(x => {
                                return (
                                    <ListItem
                                        style={styles.listItem}
                                        key={Math.random()}
                                        avatar
                                    >
                                        <Left>
                                            <Thumbnail source={{uri: x.image ? x.image :'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }} />
                                        </Left>
                                        <Body style={styles.body}> 
                                            <Left>
                                                <T>{x.name}</T>
                                            </Left>
                                            <Right>
                                                <T>{x.price}</T>
                                            </Right>
                                        </Body>
                                        
                                    </ListItem>
                                )
                            })}
                            <V style={styles.bottomContainer}>
                                <Left>
                                    <T
                                        style={styles.price}
                                    >$ {total}</T>
                                </Left>
                                <Right>
                                    <B title="Clear" />
                                </Right>
                                <Right>
                                    <B title="Checkout" onPress={() => props.navigation.navigate('Checkout')} />
                                </Right>

                            </V>
                    </Container>
                )
                :
                (
                    <Container style={styles.emptyContainer}>
                        <T>Lools like your cart is empty</T>
                        <T>Add products to your cart to get you started</T>
                    </Container>
                )
            }
        </>
        // <V style={{flex: 1}}>
        //     {cartItems.map(x => {
        //         return (
        //             <T>{x.name}</T>
        //         )
        //     })}
        // </V>
    )
}

const styles = SS.create({
    emptyContainer: {
      height: height,
      alignItems: "center",
      justifyContent: "center",
    },
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'  
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        elevation: 20
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: 'red'
    },
    hiddenContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      flexDirection: 'row'
    },
    hiddenButton: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingRight: 25,
      height: 70,
      width: width / 1.2
    }
})

export default Cart;