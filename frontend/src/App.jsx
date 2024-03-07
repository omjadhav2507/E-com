import React from 'react';
import { BrowserRouter as Router, Routes , Route,  } from 'react-router-dom';
import AdminHome from './AdminPages/AdminHome';
import AdminLogin from './AdminPages/AdminLogin'




function App() {
  return (
    <Router>
      <Routes>
      <Route path="/"  element={<AdminLogin/>}/>
      <Route path="/Adminhome"  element={<AdminHome/>}/>
      </Routes>
    </Router>
  );
}

export default App;
