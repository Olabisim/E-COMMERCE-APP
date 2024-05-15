import React from 'react'
import { StyleSheet as SS, Image as I, SafeAreaView as SAV, View as V, Dimensions as D, Text as T, ScrollView as SV, Button as B } from 'react-native';
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";
import { clearCart } from '../../../Redux/features/carts/cartSlice';
import { useDispatch } from 'react-redux';

var {height, width} = D.get('window')

const Confirm = (props) => {

    const dispatch = useDispatch()

    const finalOrder = props.route.params;

    const  confirmOrder = () => {
        setTimeout(() => {
            dispatch(clearCart());
            props.navigation.navigate("CartHome")
        }, 500)
    }

    return (
        <SV contentContainerStyle={styles.container}>
            <V style={styles.titleContainer}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>

                {
                props.route.params 
                && 
                (
                    <V style={{ borderWidth: 1, borderColor: "orange" }}>
                        <Text style={styles.title}>Shipping to:</Text>
                        <V style={{ padding: 8 }}>
                            <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
                            <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
                            <Text>City: {finalOrder.order.order.city}</Text>
                            <Text>Zip Code: {finalOrder.order.order.zip}</Text>
                            <Text>Country: {finalOrder.order.order.country}</Text>
                        </V>
                        <Text style={styles.title}>Items:</Text>
                        {/* CHANGE THIS */}
                        {/* {productUpdate && (
                        <>
                            {productUpdate.map((x) => {
                            return (
                                <ListItem style={styles.listItem} key={x.name} avatar>
                                    <Left>
                                        <Thumbnail source={{ uri: x.image }} />
                                    </Left>
                                    <Body style={styles.body}>
                                        <Left>
                                        <Text>{x.name}</Text>
                                        </Left>
                                        <Right>
                                        <Text>$ {x.price}</Text>
                                        </Right>
                                    </Body>
                                </ListItem>
                            );
                            })}
                        </>
                        )} */}
                        {finalOrder?.order?.order.orderItems.map((x) => {
                            return (
                                <ListItem style={styles.listItem} key={x.name} avatar>
                                    <Left>
                                        <Thumbnail source={{ uri: x.image }} />
                                    </Left>
                                    <Body style={styles.body}>
                                        <Left>
                                            <Text>{x.name}</Text>
                                        </Left>
                                        <Right>
                                            <Text>$ {x.price}</Text>
                                        </Right>
                                    </Body>
                                </ListItem>
                            );
                        })}

                    </V>
                )   
                }

                <V style={{ alignItems: "center", margin: 20 }}>
                    <B title={"Place order"} onPress={confirmOrder} />
                </V>
            </V>
        </SV>
    )
}


const styles = SS.create({
    container: {
      height: height,
      padding: 8,
      alignContent: "center",
      backgroundColor: "white",
    },
    titleContainer: {
      justifyContent: "center",
      alignItems: "center",
      margin: 8,
    },
    title: {
      alignSelf: "center",
      margin: 8,
      fontSize: 16,
      fontWeight: "bold",
    },
    listItem: {
      alignItems: "center",
      backgroundColor: "white",
      justifyContent: "center",
      width: width / 1.2, //divides the screen by 1.2 to add some spacing to the left and right when aligning the div
    },
    body: {
      margin: 10,
      alignItems: "center",
      flexDirection: "row",
    },
});


export default Confirm;