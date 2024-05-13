import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import {View as V, StyleSheet as SS, Dimensions as D, Text as T, ActivityIndicator, FlatList as FL, Image as I, Button as B, TouchableOpacity as TO } from 'react-native';
import {Container, Text, Left, Right, H1, ListItem, Thumbnail, Body}  from 'native-base'
import { removeFromCart } from '../../Redux/features/carts/cartSlice';
// import {SwipeListView} from 'react-native-swipe-list-view';


const CartItem = ({item}) => {
    const data  = item.product;
    const [quantity, setQuantity] = useState(item.quantity);

    const dispatch = useDispatch();

    return (
        
        <ListItem
            style={styles.listItem}
            key={Math.random()}
            avatar
            onPress={() => dispatch(removeFromCart(item))}
        >
            <Left>
                <Thumbnail source={{uri: item.image ? item.image :'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }} />
            </Left>
            <Body style={styles.body}> 
                <Left>
                    <T>{item.name}</T>
                </Left>
                <Right>
                    <T>{item.price}</T>
                </Right>
            </Body>
            
        </ListItem>
    )
}

const styles = SS.create({
    
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'  
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    }

})

export default CartItem;



        // <ListItem
        //     style={styles.listItem}
        //     key={Math.random()}
        //     avatar
        //     // onPress={() => dispatch(removeFromCart(x))}
        // >
            {/* <Left>
                <Thumbnail source={{uri: item.image ? item.image :'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }} />
            </Left>
            <Body style={styles.body}> 
                <Left>
                    <T>{item.name}</T>
                </Left>
                <Right>
                    <T>{item.price}</T>
                </Right>
            </Body> */}
            
        // </ListItem>