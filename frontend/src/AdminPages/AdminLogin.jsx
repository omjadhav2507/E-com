import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();

  const [logindt, setLogindt] = useState({
    adminEmail: "",
    adminPass: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogindt({
      ...logindt,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", logindt);

    try {
      const res = await axios.post("http://localhost:5001/adminloginapi/login", logindt);
      console.log("Response from server:", res.data);

      if (res.data.sts === 0) {
        alert("Login successful:", res.data);
        localStorage.setItem('aid', res.data.aid);
        localStorage.setItem('aemail', res.data.aemail);
        localStorage.setItem('aname', res.data.aname);
        localStorage.setItem('token', res.data.token);
           
        // Redirect to the AdminHome page
        navigate('/AdminHome');
      } else {
        console.log("Login failed:", res.data.msg);
        alert(res.data.msg);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login. Please check the console for details.");
    }
  };

  return (
    <>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Admin Email:
          <input type="email" name="adminEmail" placeholder="Admin Email" onChange={handleInputChange} />
        </label>
        <label>
          Admin Password:
          <input type="password" name="adminPass" placeholder="Password" onChange={handleInputChange} />
        </label>
        <button type="submit" disabled={!logindt.adminEmail || !logindt.adminPass}>
          Login
        </button>
      </form>
    </>
  );
}

export default AdminLogin;
