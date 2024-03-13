const mongoose = require('mongoose')
const adminPassResetSchema = new mongoose.Schema({
    adminEmail:{
        type:String,
        required:true,
    },
    reset_token:{
        type:String,
        required:true,
    },
    expiresAt:{
        type:Date,
        required:true,
    }
})

adminPassResetSchema.index({expiresAt:1},{expireAfterSeconds:0}); 

module.exports = mongoose.model('ApassReset' , adminPassResetSchema)