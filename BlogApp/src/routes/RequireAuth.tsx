import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getUser } from '../store/auth/auth.actions'


const RequireAuth = ({children}:any) => {
    const local = JSON.parse(localStorage.getItem("user"))
    console.log(local, 'requireauth')
    const [data ,setData] = useState(null)
  
    useEffect(() => {
        {local && getUser(local.user._id, local.token).then((res) => {
            console.log(res, 'reqEff')
            setData(res)
        })
        .catch((e) => {
            setData("abc")
            console.log(data, 'catch')
        })
    }
    }, [])
    const navigate = useNavigate()

    setTimeout(() => {
        if(data == "abc"){
            console.log(data, 'this is requireauth')
            return navigate("/login")
        }
        else{
            return children
        }
    }, 0)

    return children
}

export default RequireAuth