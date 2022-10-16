import axios from "axios"
import { LOGIN_ERROR, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_ERROR, REGISTER_LOADING, REGISTER_SUCCESS } from "./auth.types"

export const loginAction = (creds:object) => async (dispatch:any) => {
    dispatch({type: LOGIN_LOADING})
    try{
        let response = await axios.post("http://localhost:8080/login", creds)
        dispatch({type: LOGIN_SUCCESS, payload: response.data})
        localStorage.setItem("user", JSON.stringify(response.data))

        let getData = await getUser(response.data.user._id, response.data.token)
        console.log(getData, 'this is getdata')
        return getData
    }catch{
        dispatch({type: LOGIN_ERROR})
        return false
    }
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

export const logoutAction = () => ({ type: LOGOUT_SUCCESS });

export const getUser = async (id:string, token:string) => {
    let response = await axios.get(`http://localhost:8080/users/${id}`, {
        headers: {authorization: token}
    })

    return response.data
}