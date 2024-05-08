import React, {useState, useEffect} from 'react'
import { StyleSheet as SS, Image as I, SafeAreaView as SAV, View as V, Dimensions as D, Text as T, ScrollView as SV, Button as B } from 'react-native';

import {Left, Right, Container, H1}  from 'native-base'

const SingleProduct = (props) => {
    const [ item, setItem ] = useState(props.route.params.item);
    const [ availability, setAvailability] = useState('');

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
            </SV>
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
    }
})

export default SingleProduct;