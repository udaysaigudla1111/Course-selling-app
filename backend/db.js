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

const courseSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    imageUrl:{
        type:String,
    },
    createrId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'admin'
    }
},{
    timestamps:true
})

const userSchema = new Schema({
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

const purchaseSchema = new Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
})

const adminModel = mongoose.model("admin",adminSchema)
const courseModel = mongoose.model("course",courseSchema)
const userModel = mongoose.model("user",userSchema)
const purchaseModel = mongoose.model("purchase",purchaseSchema)

module.exports = {adminModel,courseModel,userModel,purchaseModel}