
import React from 'react';
import { StyleSheet as SS,  View as V, Dimensions as D, Text as T, ScrollView as SV } from 'react-native';
import { useSelector } from 'react-redux';
import { cartSelector } from '../Redux/features/carts/cartSlice';
import { Badge } from 'native-base';


const CartIcon = (props) => {

    const cartItems = useSelector(cartSelector)

    return(
        <>
            {
                cartItems.length
                ?
                (
                    <Badge style={styles.badge}>
                        <T style={styles.text}>{cartItems.length}</T>
                    </Badge>
                )
                :
                (
                    <>

                    </>
                )
            }
        </>
    )
}


const styles = SS.create({
    badge: {
        width: 25,
        position: 'absolute',
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        top: -4,
        right: -15
    },
    text: {
        fontSize: 12,
        weight: 100,
        fontWeight: 'bold'
    }
})

export default CartIcon;