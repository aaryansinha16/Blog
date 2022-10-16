import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../components/Home'
import Blog from '../components/Blog'
import Login from '../components/Login'
import Signup from '../components/Signup'
import RequireAuth from './RequireAuth'

function AllRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog" element={
          <RequireAuth>
            <Blog/>
          </RequireAuth>
        } />
        <Route path="/blog/:title" element={<Signup />} />
    </Routes>
  )
}

export default AllRoutes