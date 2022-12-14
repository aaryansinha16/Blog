import axios from 'axios'
import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../store/auth/interceptor'


const RequireAuth = ({children}:any) => {
    const navigate = useNavigate()
    const local = JSON.parse(`${localStorage.getItem("user")}`) || null
    console.log(local, 'requireauth')
    let test = false

    useEffect(() => {
        // ? Below redirect is for the case where there is a new user(visiting for first time) and doesn't has any kind of data in cookies/localstorage/session storage
        if(local == null){
            return navigate("/login")
        }
        // if(local != null){
            getData()
        // }
    }, [])

    let getData = () => {
        axios.get(`http://localhost:8080/users/${local.user._id}`, {
            headers : {authorization : local.token}
        }).then((res) => {
            test = true
            return children
            abc()
        }).catch((e) => {
            return navigate("/login")
            abc()
        })
        
    }

    
    function abc(){
        if(test){
            return children
        }
        return navigate("/login")
    }

    

    return children
}

export default RequireAuth