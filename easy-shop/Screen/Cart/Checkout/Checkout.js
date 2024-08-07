import React, {useState, useEffect, useContext} from 'react'
import { StyleSheet as SS, Image as I, SafeAreaView as SAV, View as V, Dimensions as D, Text as T, ScrollView as SV, Button as B } from 'react-native';
import {Item, Picker}  from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux';
import { cartSelector } from '../../../Redux/features/carts/cartSlice';
import FormContainer from '../../../Shared/Form/FormContainer';
import Input from '../../../Shared/Form/Input2';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthGlobal from '../../../Context/store/AuthGlobal';


const countries = require("../../../assets/countries.json");

const Checkout = (props) => {

    const [ orderItems, setOrderItems ] = useState();
    const [ address, setAddress ] = useState();
    const [ address2, setAddress2 ] = useState();
    const [ city, setCity ] = useState();
    const [ zip, setZip ] = useState();
    const [ country, setCountry ] = useState();
    const [ phone, setPhone ] = useState();
    const [ user, setUser ] = useState();

    const cartItems = useSelector(cartSelector)

    const context = useContext(AuthGlobal)

    // console.log('context.stateUser.user.userId')
    // console.log(context.stateUser.user.userId)

    useEffect(() => {
        setOrderItems(cartItems)

        
        if(context.stateUser.isAuthenticated) {
            // setUser(context.stateUser.user.sub)
            setUser(context.stateUser.user.userId)
        } else {
            props.navigation.navigate("Cart");
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please Login to Checkout",
                text2: ""
            });
        }


        

        return () => {
            setOrderItems()
            setUser()
        }
    }, [])

    const checkOut = () => {
        let order = {
            city,
            country,
            dateOrdered: Date.now(),
            orderItems,
            phone,
            shippingAddress1: address,
            shippingAddress2: address2,
            status: "3",
            user,
            zip,
        }

        props.navigation.navigate("Payment", {order: order })
    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >

            <FormContainer title={"Shipping Address"}>

                <Input
                    placeholder={"Phone"}
                    name={"phone"}
                    value={phone}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />

                <Input
                    placeholder={"Shipping Address 1"}
                    name={"ShippingAddress1"}
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                />

                <Input
                    placeholder={"Shipping Address 2"}
                    name={"ShippingAddress2"}
                    value={address2}
                    onChangeText={(text) => setAddress2(text)}
                />

                <Input
                    placeholder={"City"}
                    name={"city"}
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />

                <Input
                    placeholder={"Zip Code"}
                    name={"zip"}
                    value={zip}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setZip(text)}
                />
                
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
                        style={{ width: undefined }} //to make the width dynamically
                        selectedValue={country}
                        placeholder="Select your country"
                        placeholderStyle={{ color: '#007aff' }}
                        placeholderIconColor="#007aff"
                        onValueChange={(e) => setCountry(e)}
                    >
                        {countries.map((c) => {
                            return <Picker.Item 
                                        key={c.code} 
                                        label={c.name}
                                        value={c.name}
                                    />
                        })}
                    </Picker>
                </Item>
                <V style={{ width: '80%', alignItems: "center" }}>
                    <B title="Confirm" onPress={() => checkOut()} />
                </V>

            </FormContainer>

        </KeyboardAwareScrollView>
    )
}


export default Checkout;