import axios from "axios"
import { useState } from "react"
import api from './interceptor.js'
import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS } from "./auth.types"
import { useNavigate } from "react-router-dom"

export const loginAction = (creds:object) => async (dispatch:any) => {
    dispatch({type: LOGIN_LOADING})
    return api.post("/login", creds).then((res) => {
        console.log("SUCCESS, ACTIONLOGIN", res.data)
        dispatch({type: LOGIN_SUCCESS, payload: res.data})
        return res.data
    }).catch((e) => {
        console.log("FAILURE", e)
        dispatch({type : LOGIN_ERROR})
        return false
    })
    // try{
    //     let response = await axios.post("http://localhost:8080/login", creds)
    //     dispatch({type: LOGIN_SUCCESS, payload: response.data})
    //     localStorage.setItem("user", JSON.stringify(response.data))
    //     // const[test, setTest] = useState<any>(JSON.parse(`${localStorage.getItem("user")}`))

    //     let getData = await getUser(response.data.user._id, response.data.token)
    //     console.log(getData, 'this is getdata')
    //     return getData
    // }catch{
    //     dispatch({type: LOGIN_ERROR})
    //     return false
    // }
}

export const registerAction = (creds:object) => async (dispatch:any) => {
    dispatch({type: REGISTER_LOADING})
    try{
        let response = await axios.post('http://localhost:8080/signup', creds)
        dispatch({type: REGISTER_SUCCESS})
        return response.data
    }catch{
        dispatch({type: REGISTER_ERROR})
        return false
    }
}

export const logoutAction = (creds:any) => async (dispatch:any) => {
    return axios.get("http://localhost:8080/logout", {
        headers: {authorization: creds}
    }).then((res) => {
        console.log("LOGOUT SUCCESS", res.data)
        dispatch({type: LOGOUT_SUCCESS})
        return res.data
    }).catch((e) => {
        console.log("LOGOUT FAILURE", e)
        return false
    })
}

export const getUser = async (id:string, token:string) => {
    let response = await axios.get(`http://localhost:8080/users/${id}`, {
        headers: {authorization: token}
    })

    return response.data
}

export const testAction = async() => {
    const[test, setTest] = useState<any>(JSON.parse(`${localStorage.getItem("user")}`))
    return test
}