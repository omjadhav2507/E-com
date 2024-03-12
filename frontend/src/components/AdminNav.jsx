import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AdminNav() {
  const aid = localStorage.getItem("aid");
  const aemail = localStorage.getItem("aemail");
  const aname = localStorage.getItem("aname");
  const token = localStorage.getItem("token");

  const [tokendt,setTokendt] = useState({
    token
  })

  const navigate = useNavigate()

  const logout = async (e)=>{
    const res = await axios.post("http://localhost:5001/adminloginapi/logout",tokendt)
    if(res.data.logoutsts === 0){
      alert("logout okay")
      localStorage.removeItem('token')
      localStorage.removeItem('aid')
      localStorage.removeItem('aemail')
      localStorage.removeItem('aname')
      navigate('/')
    }else{
      console.error(error)
      alert(" logout failed")
    }
    
  }
  return (
    <>
        <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
          <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
          <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
          <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
          <li><a href="#" class="nav-link px-2 text-white">About</a></li>
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" class="form-control form-control-dark" placeholder="Search" aria-label="Search"/>
        </form>

        <div class="text-end">
         <Link to='/adminchangepass'> <button type="button" class="btn btn-outline-light me-2">Change password</button></Link>
          <button type="button" class="btn btn-warning" onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  </header>
    </>
  )
}

export default AdminNav