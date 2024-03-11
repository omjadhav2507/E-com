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
        const login = await Admin.findOne({ adminEmail });
        
        //
        if (!login) {
            return res.json({ "sts": 1, "msg": "Email id not found" });
        } else {
           
            if (login && await bcrypt.compare(adminPass, login.adminPass)) {
                const token = jwt.sign({ adminID: login._id }, process.env.ADMIN_TOKEN_SECRET, { expiresIn: '6hr' });

                console.log("Token Secret:", process.env.ADMIN_TOKEN_SECRET);

                const expiresAt = new Date(Date.now() + (5 * 60 * 60 * 1000))
                const adminTokenSave = new AdminToken({
                    adminId: login._id,
                    token,
                    expiresAt
                });

                const aid = login._id;
                const aemail = login.adminEmail;
                const aname = login.adminName;

                await adminTokenSave.save();
                return res.json({ "sts": 0, aid, aemail, aname, token });
            } else {
                return res.json({ "sts": 2, "msg": "Password wrong" });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/checkentoken', async(req,res)=>{
    const token = req.body.token

    try {
        const tokenchk = await AdminToken.findOne({token})
        if (!tokenchk) {
            return res.json({ "tokensts":1}) // no token 
        } else {
            return res.json({ "tokensts":0}) // token found
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
 
})

// http://localhost:5001/adminloginapi/updatepass
router.post('/updatepass', async (req, res) => {
    const adminEmail = req.body.adminEmail;
    const oldpass = req.body.oldpass;
    const newpass = req.body.newpass;

    try {
        const passchk = await Admin.findOne({ adminEmail });

        if (passchk && await bcrypt.compare(oldpass, passchk.adminPass)) {
            console.log({ "msg": "Old password is matched" });

            const updateAdminPass = await Admin.findOneAndUpdate(
                { adminEmail: adminEmail },
                { adminPass: await bcrypt.hash(newpass, 12) },
                { new: true }
            );

            if (updateAdminPass) {
                console.log({ "msg": "Password is changed in the database" });
                res.json({
                    "csts": 0, "msg": "Password is changed"
                });
            } else {
                console.log("Password update failed");
                res.json({
                    "csts": 1, "msg": "Password is not changed in the database"
                });
            }
        } else {
            console.log({ "msg": "Old password does not match" });
            res.json({
                "csts": 1, "msg": "Password is not changed"
            });
        }
    } catch (error) {
        console.error("Update Password Error:", error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router