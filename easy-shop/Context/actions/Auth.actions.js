import AsyncStorage from '@react-native-async-storage/async-storage';
import baseURL from '../../assets/common/baseUrl';
import Toast from 'react-native-toast-message'
import { jwtDecode } from 'jwt-decode'
import "core-js/stable/atob";
import { setCurrentUserRTK } from '../../Redux/features/users/userSlice';


export const SET_CURRENT_USER = "SET_CURRENT_USER";


export const loginUser = (user, dispatch) => {
    fetch(`${baseURL}user/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data) {
            const token = data.token;
            AsyncStorage.setItem("jwt", token)
            const decoded = jwtDecode(token)
            dispatch(setCurrentUser(decoded, user))
            //  new way to set the userprofile and get it with useSelector.
            // dispatchRTK(setCurrentUserRTK({user: decoded, userProfile: user}))
            Toast.show({
                topOffset: 60,
                type: "success",
                text1: "Logged in Successfully",
                text2: ""
            });
            console.log("this got to the end of the function of login functionality")
        } else {
           console.log("entered the else part::logout user session")
           logoutUser(dispatch)
        }
    })
    .catch((err) => {
        console.log("err from the login functionality")
        console.log(err)
        Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Please provide correct credentials",
            text2: ""
        });
        logoutUser(dispatch)
    });
};


export const getUserProfile = (id) => {
    fetch(`${baseURL}users/${id}`, {
        method: "GET",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
}


export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}


export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}