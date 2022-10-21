import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { getUser } from '../store/auth/auth.actions'


const RequireAuth = ({children, test}:any) => {
    const local = JSON.parse(`${localStorage.getItem("user")}`) || ""
    console.log(local, 'requireauth')
    const [data ,setData] = useState(null)
    // const test = useSelector((store:any) => store.auth.token)
    console.log(test, "TEST, Req auth")
    // const [test, setTest ] = useState<any>("")


    // let getData = async () => {
    //     let response = await axios.get(`http://localhost:8080/users/${local.user._id}`, {
    //         headers: {authorization : local.token}
    //     })
    //     return response.data
    // }
    // useEffect(() => {
    //     {local && getUser(local.user._id, local.token).then((res) => {
    //         console.log(res, 'reqEff')
    //         setData(res)
    //     })
    //     .catch((e) => {
    //         setData("abc")
    //         console.log(data, 'catch')
    //     })
    // }
    // }, [])
    const navigate = useNavigate()

    // getData().then((res) => {
    //     // setTimeout(() => {
    //         console.log(res, "REQUIREAUTH", children)
    //         setTest(res._id)
    //         // return children
    //         // }, 1000)
    //     }).catch((e) => {
    //     console.log(e, "This is reqAuth ERR")
    //     // return navigate("/")
    // })
    
    // setTimeout(() => {
        if(test.length != 0){
            console.log(test, 'this is requireauth')
            return children
        }
        else{
            console.log("this is Err REq Auth");
            
            return <Navigate to="/login" />
        }
    // }, 0)
    
    // return children
}

export default RequireAuth