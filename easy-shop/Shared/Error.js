import React, {useEffect, useState} from 'react'
import {View as V, StyleSheet as SS, Text as T, FlatList as FL,  Dimensions as D, ActivityIndicator as AI, Button as B } from 'react-native'


const Error = (props) => {
    return (
        <V style={styles.container}>
            <T style={styles.text}>{props.message}</T>
        </V>
    )
}

const styles = SS.create({
    container: {
        width: '100%',
        alignItems: 'center',
        margin: 10
    },
    text: {
        color: 'red'
    }
})

export default Error;