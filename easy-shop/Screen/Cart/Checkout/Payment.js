import React, {useState} from 'react'
import { StyleSheet as SS, Image as I, SafeAreaView as SAV, View as V, Dimensions as D, Text as T, ScrollView as SV, Button as B } from 'react-native';
import { Container, Header, Content, ListItem, Text, Radio, Right, Left, Picker, Icon, Body, Title} from 'native-base';


const methods = [
    { name: 'Cash on Delivery', value: 1 },
    { name: 'Bank Transfer', value: 2 },
    { name: 'Card Payment', value: 3}
]

const paymentCards = [
    { name: 'Wallet', value: 1 },
    { name: 'Visa', value: 2 },
    { name: 'MasterCard', value: 3},
    { name: 'Other', value: 4}
]

const Payment = (props) => {

    // to catch the order details passed in checkout (i.e. shipping page)  ----- props.navigation.navigate("Payment", {order: order }) passed to pass the order, it is now receved as a params

    const order = props.route.params
    
    const [selected, setSelected] = useState();
    const [card, setCard] = useState();
    
    return (
        <Container>

            <Header>
                <Body>
                    <Title>Choose your payment method</Title>
                </Body>
            </Header>

            <Content>
                {methods.map((item, index) => {
                   return (
                       <ListItem key={item.name} onPress={() => setSelected(item.value)}>
                           <Left>
                                <Text>{item.name}</Text>
                           </Left>
                           <Right>
                                <Radio selected={selected == item.value} />
                           </Right>
                       </ListItem>
                   )
                })}
                {selected == 3 && (
                   <Picker
                        mode="dropdown"
                        iosIcon={<Icon name={"arrow-down"} />}
                        headerStyle={{ backgroundColor: 'orange' }}
                        headerBackButtonTextStyle={{ color: '#fff' }}
                        headerTitleStyle={{ color: '#fff' }}
                        selectedValue={card}
                        onValueChange={(x) => setCard(x)}
                   >
                       {paymentCards.map((c, index) => {
                           return   <Picker.Item 
                                        key={c.name} 
                                        label={c.name} 
                                        value={c.name} 
                                    />
                       })}
                   </Picker>
               )}

                <V style={{ marginTop: 60, alignSelf: 'center' }}>
                       <B 
                            title={"Confirm"} 
                            onPress={() => props.navigation.navigate("Confirm", { order })}
                       />
                </V>

            </Content>

        </Container>
    )
}

export default Payment;