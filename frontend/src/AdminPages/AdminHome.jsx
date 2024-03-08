import React from "react";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();
  const aid = localStorage.getItem("aid");
  const aemail = localStorage.getItem("aemail");
  const aname = localStorage.getItem("aname");
  const token = localStorage.getItem("token");

  if (token === null) {
    navigate("/");
  }

  return (
    <>
      <div>AdminHome </div>
      <h2> welcome {aname}</h2>
    </>
  );
}

export default AdminHome;
