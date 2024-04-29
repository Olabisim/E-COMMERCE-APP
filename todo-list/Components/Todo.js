
import React, {useState} from 'react';

import {View as V, Text as T, Button as B, StyleSheet as SS} from 'react-native';

const Todo = (props) => {
    return (
        <V style={[styles.item, {margin: 8, padding: 8}]}>
            <T>{props.item}</T>
            <B 
                title={'Delete'}
                color={'red'}
                onPress={() => props.delete(props.item)}
            />
        </V>
    )
}

const styles =  SS.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'whitesmoke'
    }
})

export default Todo;