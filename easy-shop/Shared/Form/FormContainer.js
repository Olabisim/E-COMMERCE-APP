import React, {useState, useEffect} from 'react'
import { StyleSheet as SS, Image as I, SafeAreaView as SAV, View as V, Dimensions as D, Text as T, ScrollView as SV, Button as B } from 'react-native';
import {Left, Right, Container, H1}  from 'native-base'


var {width} = D.get("window")

const FormContainer = (props) => {

    return (
        <SV contentContainerStyle={styles.container}>  
            <T style={styles.title}>{props.title}</T>
            {props.children}
        </SV>
    )
}

const styles = SS.create({
    container: {
        marginTop: 30,
        marginBottom: 400,
        width,
        justifyContent: 'center',
        alignItems: 'center'

    },
    title: {
        fontSize: 30
    }
})

export default FormContainer;