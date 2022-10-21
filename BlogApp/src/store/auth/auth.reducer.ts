import { useState } from "react";
import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS } from "./auth.types";

const initState = {
    loading: false,
    error: false,
    token: ""
}

export const authReducer = (state=initState, {payload, type}:any) => {
    switch(type){
        case REGISTER_LOADING:{

            return {
                ...state,
                loading: true,
                error: false
            }

        }
        case REGISTER_ERROR:{

            return {
                ...state,
                loading:false,
                error: true
            }

        }
        case REGISTER_SUCCESS:{
            return {
                ...state,
                loading: false,
                error: false
            }

        }
        case LOGIN_LOADING:{
            return {
                ...state,
                loading:true,
                error: false
            }
        }
        case LOGIN_ERROR:{
            return {
                ...state,
                loading:false,
                error: true
            }
        }
        case LOGIN_SUCCESS:{
            // const[test, setTest] = useState<any>(JSON.parse(`${localStorage.getItem("user")}`))
            // console.log(test,"TEST")
            console.log(payload, "PAYLOAD")
            return {
                ...state,
                loading:false,
                error: false,
                token: payload._id
            }
        }
        case LOGOUT_SUCCESS: {
            localStorage.removeItem("user")
            return {
                ...state,
                loading:false,
                error:false,
                token: ""
            }
        }
        default:{
            return state
        }
    }
}