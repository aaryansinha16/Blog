import React, { useEffect, useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../components/Home'
import Blog from '../components/Blog'
import Login from '../components/Login'
import Signup from '../components/Signup'
import RequireAuth from './RequireAuth'
import { useSelector } from 'react-redux'
import axios from 'axios'

function AllRoutes() {
  const local = JSON.parse(`${localStorage.getItem("user")}`) || ""
  const ab:any = useSelector((store:any) => store.auth.token)
    console.log(ab, "LOGINTEST")

  let getData = async () => {
    let response = await axios.get(`http://localhost:8080/users/${local.user._id}`, {
        headers: {authorization : local.token}
    })
    return response.data
  }
  const [test ,setTest ] = useState<any>("")
  getData().then((res) => {
      // setTimeout(() => {
          // console.log(res, "REQUIREAUTH", children)
          setTest(res._id)
          // return children
          // }, 1000)
      }).catch((e) => {
      console.log(e, "This is reqAuth ERR")
      // return navigate("/")
  })

  useEffect(() => {

  }, [ab])
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog" element={
          <RequireAuth test={test}>
            <Blog/>
          </RequireAuth>
        } />
        <Route path="/blog/:title" element={<Signup />} />
    </Routes>
  )
}

export default AllRoutes