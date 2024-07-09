import React, {useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {View as V, StyleSheet as SS, Dimensions as D, Text as T, FlatList as FL, Image as I, Button as B, TouchableOpacity as TO } from 'react-native';
import {Container, Text, Left, Right, H1, ListItem, Thumbnail, Body, Icon}  from 'native-base'
import { cartSelector, clearCart, removeFromCart } from '../../Redux/features/carts/cartSlice';
import {SwipeListView} from 'react-native-swipe-list-view';
import CartItem from './CartItem';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import AuthGlobal from '../../Context/store/AuthGlobal'

var {height, width} = D.get("window")

function Cart(props) {

    const context = useContext(AuthGlobal)

    console.log('context')
    console.log(context.stateUser.isAuthenticated)

    const cartItems = useSelector(cartSelector)

    const dispatch = useDispatch()

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
                                    <CartItem item={x}  />
                                )
                            })}
                            {/* <SwipeListView 
                                data={cartItems}
                                renderItem={(data) => (
                                    <CartItem item={data} />
                                )}
                                renderHiddenItem={(data) => {
                                    <V style={styles.hiddenContainer}>
                                        <TO style={styles.hiddenButton}>
                                            <Icon name="trash" color={"white"} size={30} />
                                        </TO>
                                    </V>
                                }}
                                // disableRightSwipe={true}
                                previewOpenDelay={3000}
                                friction={1000}
                                tension={40}
                                leftOpenValue={75}
                                stopLeftSwipe={75}
                                rightOpenValue={-75}
                            /> */}
                            <V style={styles.bottomContainer}>
                                <Left>
                                    <T
                                        style={styles.price}
                                    >$ {total}</T>
                                </Left>
                                <Right>
                                    <EasyButton danger medium onPress={() => dispatch(clearCart())}>
                                        <T style={{color: 'white'}}>Clear</T>
                                    </EasyButton>
                                </Right>
                                <Right>
                                    {
                                        context.stateUser.isAuthenticated ? (
                                            <EasyButton
                                                primary
                                                medium 
                                                onPress={() => props.navigation.navigate('Checkout')}
                                            >
                                                <T style={{color: 'white'}}>Checkout</T>
                                            </EasyButton>
                                        )
                                        :
                                        (
                                            <EasyButton
                                                secondary
                                                medium 
                                                onPress={() => props.navigation.navigate('User')}
                                            >
                                                <T style={{color: 'white'}}>Login</T>
                                            </EasyButton>
                                        )
                                    }
{/* 
                                    <EasyButton primary medium onPress={() => props.navigation.navigate('Checkout')}>
                                        <T style={{color: 'white'}}>Checkout</T>
                                    </EasyButton> */}
                                </Right>
                            </V>
                    </Container>
                )
                :
                (
                    <Container style={styles.emptyContainer}>
                        <T>Looks like your cart is empty</T>
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