import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { getUser } from '../store/auth/auth.actions'

const RequireAuth = ({children}:any) => {
    let local = JSON.parse(localStorage.getItem("user"))
    const [data ,setData] = useState(null)
  
    useEffect(() => {
        {local && getUser(local.user._id, local.token).then((res) => setData(res))}

    }, [])

    if(data == null){
        console.log(data, 'this is requireauth')
        return <Navigate to='/login'/>
    }

    return children
}

export default RequireAuth