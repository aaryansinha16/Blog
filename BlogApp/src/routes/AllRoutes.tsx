import React, { useEffect, useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../components/Home'
import Blog from '../components/Blog'
import Login from '../components/Login'
import Signup from '../components/Signup'
import RequireAuth from './RequireAuth'
import { useSelector } from 'react-redux'
import axios from 'axios'
import SingleBlog from './SingleBlog'

function AllRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog" element={
          // <RequireAuth>
            <Blog/>
          // {/* </RequireAuth> */}
        } />
        <Route path="/blog/:id" element={
          // <RequireAuth>
            <SingleBlog/>
          // {/* </RequireAuth> */}
        } />
        <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default AllRoutes