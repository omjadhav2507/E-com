const Admin = require('../../models/Admin')
const express = require('express')
const  bcrypt = require('bcryptjs')
const router = express.Router()


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


module.exports = router