import React, {useEffect, useState} from 'react'
import { StyleSheet as SS, Image as I, SafeAreaView as SAV, View as V, Dimensions as D, Text as T, ScrollView as SV, Button as B } from 'react-native';

import {Left, Right, Container, H1}  from 'native-base'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/features/carts/cartSlice';
import Toast from "react-native-toast-message";
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import TrafficLight from '../../Shared/StyledComponents/TrafficLight';

const SingleProduct = (props) => {
    
    const [ item, setItem ] = useState(props.route.params.item);
    const [ availability, setAvailability] = useState(null);
    const [availabilityText, setAvailabilityText] = useState("")

    const dispatch = useDispatch()

    
    useEffect(() => {
        if (props.route.params.item.countInStock == 0) {
            setAvailability(<TrafficLight unavailable></TrafficLight>);
            setAvailabilityText("Unvailable")
        } else if (props.route.params.item.countInStock <= 5) {
            setAvailability(<TrafficLight limited></TrafficLight>);
            setAvailabilityText("Limited Stock")
        } else {
            setAvailability(<TrafficLight available></TrafficLight>);
            setAvailabilityText("Available")
        }

        return () => {
            setAvailability(null);
            setAvailabilityText("");
        }
    }, [])


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
                
                <V style={styles.availabilityContainer}>
                    <V style={styles.availability}>
                        <T style={{ marginRight: 10 }}>
                            Availability: {availabilityText}
                        </T>
                        {availability}
                    </V>
                    <T>{item.description}</T>
                </V>
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
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    }
})

export default SingleProduct;