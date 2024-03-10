import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function ApassChange() {

    const navigate = useNavigate()


    const aid = localStorage.getItem("aid");
    const aemail = localStorage.getItem("aemail");
    const aname = localStorage.getItem("aname");
    const token = localStorage.getItem("token");

    useEffect(()=>{
        if(token === null){
            navigate('/')
        }

    },[])

    const handleSubmit =()=>{

    }
    const handleInputChange =()=>{

    }

  return (
    <>
     <form onSubmit={handleSubmit}>
        <h2> change password of {aemail}</h2>
        <label>
          Old Password:
          <input type="password" name="oldpass" placeholder="old password" onChange={handleInputChange} />
        </label>
        <label>
          New Password:
          <input type="password" name="newpass" placeholder="New Password" onChange={handleInputChange} />
        </label>
        <button type="submit" >
          Login
        </button>
      </form>
    
    </>
  )
}

export default ApassChange