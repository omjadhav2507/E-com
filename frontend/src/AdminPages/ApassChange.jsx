import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ApassChange() {
    const navigate = useNavigate();

    const aid = localStorage.getItem("aid");
    const aemail = localStorage.getItem("aemail");
    const token = localStorage.getItem("token");

    const [cpass, setCpass] = useState({
        adminEmail: aemail,
        oldpass: '',
        newpass: ''
    });

    useEffect(() => {
        if (token === null) {
            navigate('/');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/adminloginapi/updatepass", cpass);
            console.log(res);

            if (res.data.csts === 0) {
                alert("Password changed successfully!");
                navigate('/');
            } else {
                alert("Password change failed. Please check your old password.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCpass({ ...cpass, [name]: value });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Change password of {aemail}</h2>
                <label>
                    Old Password:
                    <input type="password" name="oldpass" placeholder="Old password" onChange={handleInputChange} />
                </label>
                <label>
                    New Password:
                    <input type="password" name="newpass" placeholder="New Password" onChange={handleInputChange} />
                </label>
                <button type="submit">
                    Change Password
                </button>
            </form>
        </>
    );
}

export default ApassChange;
