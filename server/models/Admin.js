const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    adminName : {
        type:String,
        required:true
    },
    adminEmail : {
        type:String,
        required:true
    },
    adminPass : {
        type:String,
        required:true
    },

})

module.exports = mongoose.model('ecom_admin', adminSchema);