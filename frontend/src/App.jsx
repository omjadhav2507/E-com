import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'; 
import AdminLogin from './AdminPages/AdminLogin' 
import AdminHome from './AdminPages/AdminHome'
import ApassChange from './AdminPages/ApassChange';

function App() {
  const token = localStorage.getItem('token');
  const [tokendt, setTokendt] = useState({
    token
  });

  useEffect(() => {
    const chkToken = async () => {
      try {
        const res = await axios.post("http://localhost:5001/adminloginapi/checkentoken", tokendt);

        
        console.log("Response from server:", res.data);
        if (res.data.token === 1) {
          const aid = localStorage.removeItem("aid");
          const aemail = localStorage.removeItem("aemail");
          const aname = localStorage.removeItem("aname");
          const token = localStorage.removeItem("token");
        }
      } catch (error) {
        console.error(error);
      }
    }

    chkToken();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin/>} />
        <Route path="/Adminhome" element={<AdminHome />} />
        <Route path="/adminchangepass" element={<ApassChange/>}/>
      </Routes>
    </Router>
  );
}

export default App;
