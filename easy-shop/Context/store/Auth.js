import React, { useEffect, useReducer, useState } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCurrentUser } from "../../Redux/features/users/userSlice";

// import { setCurrentUser } from "../actions/Auth.actions";
import AuthGlobal from './AuthGlobal'
import AuthReducer from "../reducers/Auth.reducer";

const Auth = props => {
    const [stateUser, dispatch] = useReducer(AuthReducer, {
        isAuthenticated: null,
        user: {}
    });
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        setShowChild(true);
        if (AsyncStorage.jwt) {
            const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : "";
            if (setShowChild) {
                dispatch(setCurrentUser(jwt_decode(decoded)))
            }
        }
        return () => setShowChild(false);
    }, [])


    if (!showChild) {
        return null;
    } else {
        return (
            <AuthGlobal.Provider
                value={{
                    stateUser,
                    dispatch
                }}
            >
                {props.children}
            </AuthGlobal.Provider>
        )
    }
};

export default Auth;