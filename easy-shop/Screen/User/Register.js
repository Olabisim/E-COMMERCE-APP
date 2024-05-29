import React, {useEffect, useState, useCallback} from 'react'
import {View as V, StyleSheet as SS, Text as T, FlatList as FL,  Dimensions as D, ActivityIndicator as AI, Button as B } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormContainer from '../../Shared/Form/FormContainer';
import Input from '../../Shared/Form/Input2';
import Error from '../../Shared/Error';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
import Toast from "react-native-toast-message";
import EasyButton from '../../Shared/StyledComponents/EasyButton';


const Register = (props) => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const register = () => {
        if (email === "" || name === "" || phone === "" || password === "") {
          setError("Please fill in the form correctly");
        }
    
        let user = {
          name: name,
          email: email,
          password: password,
          phone: phone,
          isAdmin: false,
        };

        axios
        .post(`${baseURL}user`, user)
        .then((res) => {
          if (res.status == 200) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Registration Succeeded",
              text2: "Please Login into your account",
            });
            // console.log("res success")
            // console.log(res)
            setTimeout(() => {
              props.navigation.navigate("Login");
            }, 500);
          }
        })
        .catch((error) => {
            // console.log("res error")
            // console.log(error)
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Something went wrong",
                text2: "Please try again",
            });
        });

    }

    return (
        <KeyboardAwareScrollView
            viewIsInsideTabBar={true}
            extraHeight={200}
            enableOnAndroid={true}
        >
            <FormContainer title="Register">

                <Input
                    placeholder={"Email"}
                    name={"email"}
                    id={"email"}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                />

                <Input
                    placeholder={"Name"}
                    name={"name"}
                    id={"name"}
                    onChangeText={(text) => setName(text)}
                />

                <Input
                    placeholder={"Phone Number"}
                    name={"phone"}
                    id={"phone"}
                    keyboardType={"numeric"}
                    onChangeText={(text) => setPhone(text)}
                />

                <Input
                    placeholder={"Password"}
                    name={"password"}
                    id={"password"}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />

                <V style={styles.buttonGroup}>
                    {error ? <Error message={error} /> : null}
                </V>
                <V>
                    <EasyButton large primary onPress={() => register()}>
                        <T style={{color: 'white'}}>Register</T>
                    </EasyButton>
                </V>
                
                <V>
                    <EasyButton large secondary onPress={() => props.navigation.navigate("Login")}>
                      <T style={{color: 'white'}}>Back to Login</T>
                    </EasyButton>

                </V>

            </FormContainer>
        </KeyboardAwareScrollView>
        // <V>
        //     <T>Register Screen</T>
        // </V>
    )
}


const styles = SS.create({
    buttonGroup: {
      width: "80%",
      margin: 10,
      alignItems: "center",
    },
  });


export default Register;