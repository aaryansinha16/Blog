import axios from 'axios'
import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../store/auth/interceptor'


const RequireAuth = ({children}:any) => {
    const local = JSON.parse(`${localStorage.getItem("user")}`) || ""
    console.log(local, 'requireauth')
    let test = false

    useEffect(() => {
        getData()
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

    const navigate = useNavigate()
    
    function abc(){
        if(test){
            return children
        }
        return navigate("/login")
    }

    return children
}

export default RequireAuth