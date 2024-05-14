import React, {useState, useEffect} from 'react'
// import { StyleSheet as SS, Image as I, SafeAreaView as SAV, View as V, Dimensions as D, Text as T, ScrollView as SV, Button as B } from 'react-native';
import { TextInput as TI, StyleSheet as SS } from 'react-native'

const Input = (props) => {
    return (
        <TI
            style={styles.input}
            placeholder={props.placeholder}
            name={props.name}
            id={props.id}
            value={props.value}
            autoCorrect={props.autoCorrect}
            onChangeText={props.onChangeText}
            onFocus={props.onFocus}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
        >
        </TI>
    );
}

const styles = SS.create({
    input: {
        width: '80%',
        height: 60,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 20,
        padding: 10,
        borderWidth: 2,
        borderColor: 'orange'
    },
});

export default Input;