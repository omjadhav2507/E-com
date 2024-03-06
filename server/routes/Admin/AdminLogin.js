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

router.post('login', async(req,res)=>{

    const  adminEmail = req.body.adminEmail
      const adminPass = req.body.adminName

    try {
      
        const login = await Admin.findOne({adminEmail})
        if (!adminEmail) {
            return res.json({"sts":1,"msg":" Email id not found "})
        } else {
            if (await bcrypt.compare(adminPass,login.adminPass)) {
                const token = jwt.sign({adminID:login._id},S_k,{expiresIn:'6hr'})
                const expiresAt = new Date(date.now()+(5*60*60*1000))
                const adminTokenSave = new AdminToken({
                    adminId:login._id,
                    token,
                    expiresAt
                })

                const aid = login._id,
                const aemail = login.adminEmail
                const ename = login.adminName

                await adminTokenSave.save()
                return res.json({"sts":0,aid,aemail,ename ,token})

            } else {
                return res.json({"sts":2,"msg":" password wrong "})
            }
        }

        
    
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
 
})


module.exports = router