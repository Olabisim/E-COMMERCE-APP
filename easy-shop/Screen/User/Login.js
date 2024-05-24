import React, {useEffect, useState} from 'react'
import {View as V, StyleSheet as SS, Text as T, FlatList as FL,  Dimensions as D, ActivityIndicator as AI, Button as B } from 'react-native'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input2'


const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <FormContainer>

            <Input 
                placeholder={"Enter Email"}
                name={"email"}
                id={"email"}
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
            />

            <Input 
                placeholder={"Enter Password"}
                name={"password"}
                id={"password"}
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />
            
            <V style={styles.buttonGroup}>
                <B title="Login" />
            </V>
            
            <V style={[{marginTop: 40}, styles.buttonGroup]}>
                <T style={styles.middleText}>Don't have an account yet?</T>
                <B title="Register" onPress={() => props.navigation.navigate("Register")} />
            </V>

        </FormContainer>
    )
}

const styles = SS.create({
    buttonGroup: {
      width: "80%",
      alignItems: "center",
    },
    middleText: {
      marginBottom: 20,
      alignSelf: "center",
    },
  });

export default Login;