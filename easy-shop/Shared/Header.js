
import React from 'react';
import { StyleSheet as SS, Image as I, SafeAreaView as SAV, View as V } from 'react-native';

const Header = () => {
    return (
        <V style={styles.header}>
            <I 
                source={require("../assets/Logo.png")} 
                resizeMode="contain"
                style={{height: 50}}
            />
        </V>
    )
}

const styles = SS.create({
    header: {        
        width: "100%",
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        padding: 20,
        paddingTop: 30
    }
})

export default Header;