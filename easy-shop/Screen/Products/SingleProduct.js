import React, {useState} from 'react'
import { StyleSheet as SS, Image as I, SafeAreaView as SAV, View as V, Dimensions as D, Text as T, ScrollView as SV, Button as B } from 'react-native';

import {Left, Right, Container, H1}  from 'native-base'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/features/carts/cartSlice';
import Toast from "react-native-toast-message";
import EasyButton from '../../Shared/StyledComponents/EasyButton';

const SingleProduct = (props) => {
    
    const [ item, setItem ] = useState(props.route.params.item);
    const [ availability, setAvailability] = useState('');

    const dispatch = useDispatch()

    return (
        <Container style={styles.container}>
            <SV style={{marginBottom: 80, padding: 5}}>
                <V>
                    <I 
                        source={{uri: item.image ? item.image : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'}}
                        resizeMode='contain'
                        style={styles.image}
                    />
                </V>
                <V style={styles.contentContainer}>
                    <H1 style={styles.contentHeader}>{item.name}</H1>
                    <T style={styles.contentText}>{item.brand}</T>
                </V>
                {/* TODO: Description, Rich Description and Availability */}
            </SV>

            <V style={styles.bottomContainer}>
                <Left>
                    <T>$ {item.price}</T>
                </Left>
                <Right>
                    <EasyButton
                        primary medium
                        onPress={() => {
                            dispatch(addToCart(item)),
                            Toast.show({
                                topOffset: 60,
                                type: "success",
                                text1: `${item.name} - added to Cart`,
                                text2: "Go to your cart to complete order",
                              })
                        }} 
                    >
                        <T style={{color: 'white'}}>Add</T>
                    </EasyButton>  
                </Right>
            </V>
        </Container>
    )
}

const styles = SS.create({
    container: {
        position: 'relative',
        height: "100%"
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0, 
        margin: 0
    },
    image: {
        width: "100%",
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white'
    },
    price: {
        fontSize: 25,
        margin: 20, 
        color: 'red'
    }
})

export default SingleProduct;