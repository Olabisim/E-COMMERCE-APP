import React from 'react'
import {View as V, StyleSheet as SS, Dimensions as D, Text as T, FlatList as FL, Image as I, Button as B } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/features/carts/cartSlice';
import Toast from "react-native-toast-message";
import EasyButton from '../../Shared/StyledComponents/EasyButton';

var {width} = D.get("window");

const ProductCard = (props) => {

    const {name, price, image, countInStock} = props;

    const dispatch = useDispatch()

    return (
        <V style={styles.container}>
            <I 
                style={styles.image} 
                resizeMode='contain'
                source={{uri: image ? image :'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png' }}
            />

            {/* <V style={styles.container} /> */}

            <V style={styles.innerContainer}>
                <T style={styles.title}>
                    {name.length > 15 ? name.substring(0, 15-3) + '...' : name}
                </T>
                <T style={styles.price}>${price}</T>
                {
                    countInStock > 0 
                    ? 
                    (
                    <V style={{marginBottom: 0}}>

                        {/* old code */}
                        {/* <EasyButton 
                            primary medium
                            onPress={() => {
                                dispatch(addToCart(props)), 
                                Toast.show({
                                  topOffset: 60,
                                  type: "success",
                                  text1: `${name} - added to Cart`,
                                  text2: "Go to your cart to complete order",
                                })
                            }} 
                        >
                            <T style={{color: 'white'}}>Add</T>
                        </EasyButton> */}

                        {/* "_id": "662639498ebaf8d7d994e42c",
                        "brand": "product brand",
                        "category": {},
                        "countInStock": "23",
                        "dateCreated": "2024-04-22T10:17:45.466Z",
                        "description": "describing the value",
                        "id": "662639498ebaf8d7d994e42c",
                        "image": "https://e-commerce-app-lime-five.vercel.app/public/uploads/DARN-app-(2).jpg-1713781065264.jpeg",
                        "images": [],
                        "isFeatured": true,
                        "name": "ola product ",
                        "numReviews": 22,
                        "price": 23,
                        "rating": 3,
                        "richDescription": "rich in descitption" */}

                        <EasyButton 
                            primary
                            medium
                            onPress={() => {
                            dispatch(addToCart({name: props.name, brand: props.brand, description: props.description, image: props.image, product: props.id, quantity: 1, price: props.price})), 
                            // props.addItemToCart(props.id),
                            Toast.show({
                            topOffset: 60,
                            type: "success",
                            text1: `${name} added to Cart`,
                            text2: "Go to your cart to complete order"
                            })
                            }}
                        >
                            <T style={{ color: "white"}}>Add</T>
                        </EasyButton>
                    </V>
                    )
                    :
                    <T style={{marginTop: 0 }}>Currently Unavailable</T> 
                }
            </V>
        </V>
    )
}

const styles = SS.create({
    container: {
        width: width / 2.3,
        height: width / 1.8,
        padding: 10,
        paddingTop: 20,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: 'center',
        elevation: 8, // for box shadow on the card
        backgroundColor: 'white',
        flex: 1
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 5,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: -65,
        padding: 20,
        paddingTop: 30
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: 'transparent',
        width: width / 2 - 20 - 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: 'center'
        // marginTop: 50
    },
    price: {
        fontSize: 20,
        color: 'orange',
        marginTop: 10,
        marginBottom: 3,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignContent: 'center',
        paddingBottom: 10
    }
})

export default ProductCard;