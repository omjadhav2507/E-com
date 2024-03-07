require('dotenv').config();

const Admin = require('../../models/Admin')
const AdminToken = require('../../models/AdminToken')
const express = require('express')
const  bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const router = express.Router()

const S_k = "omjadhav"

// http://localhost:5001/adminloginapi/createadmin

router.post('/createadmin', async(req,res)=>{
    try {
        const NewAdmin = new Admin({
            adminName:req.body.adminName,
            adminEmail:req.body.adminEmail,
            adminPass:await bcrypt.hash(req.body.adminPass,12)
        })
        const saveAdmin = await NewAdmin.save()
        res.status(200).json(saveAdmin)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
 
})

// http://localhost:5001/adminloginapi/login

router.post('/login', async (req, res) => {
    const adminEmail = req.body.adminEmail;
    const adminPass = req.body.adminPass;

    try {
        if (!adminEmail || !adminPass) {
            console.log("Email or password is empty");
            return res.json({ "sts": 1, "msg": "Email or password is empty" });
        }

        const login = await Admin.findOne({ adminEmail });

        if (!login) {
            console.log("Email not found in the database");
            return res.json({ "sts": 2, "msg": "Email not found" });
        } else {
            console.log("User found in the database:", login);

            const passwordMatch = await bcrypt.compare(adminPass, login.adminPass);

            if (passwordMatch) {
                console.log("Password is correct");
                
                return res.json({ "sts": 0, });
            } else {
                console.log("Password is wrong");
                return res.json({ "sts": 3, "msg": "Password is wrong" });
            }
        }
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ error: error.message });
    }
});






module.exports = router