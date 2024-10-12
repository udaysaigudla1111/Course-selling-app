const mongoose = require("mongoose")
const Schema = mongoose.Schema



const adminSchema = new Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    }

},{
    timestamps:true
})

const adminModel = mongoose.model("admin",adminSchema)

module.exports = {adminModel}