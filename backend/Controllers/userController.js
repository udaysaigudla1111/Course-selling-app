const {z} = require("zod")
const {userModel,purchaseModel} = require("../db.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userControllerSignup = async (req,res)=>{

    const {email,password,firstName,lastName} = req.body;

      const requiredBody = z.object({
        email:z.string().min(5).max(30).trim().email(),
        password:z.string().min(3).max(22),
        firstName:z.string().trim().min(3).max(20),
        lastName:z.string().min(3).max(30).trim()
    })

    const parsedBody = requiredBody.safeParse(req.body)

    if(!parsedBody.success)
    {
        return res.status(400).json({
            message:"PLEASE ENTER THE DETAILS CORRECTLY!!!",
            error:parsedBody.error
        })
    }

    try {

        const userExists = await userModel.findOne({email})

        if(userExists)
        {
            return res.status(400).json({
                message:"USER ALREADY EXISTS PLEASE SIGNIN"
            })
        }

        const hashedPassword = await bcrypt.hash(password,5)

        const user = await userModel.create({
            email,
            password:hashedPassword,
            firstName,
            lastName
        })

        return res.status(200).json({
            message:"USER SIGNUP SUCCESSFULLY",
            user
        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message:"INTERNAL SERVER ERROR"
        })
    }


}

const userControllerSignin = async (req,res)=>{

    const {email,password} = req.body;

     const requiredBody = z.object({
        email:z.string().min(5).max(30).email(),
        password:z.string().min(3).max(8)
    })

    const parsedBody = requiredBody.safeParse(req.body)

    if(!parsedBody.success)
    {
        return res.json({
            message:"PLEASE ENTER THE DETAILS CORRECTLY",
            error:parsedBody.error
        })
    }

    try {
        
        const userExists = await userModel.findOne({email})

        if(!userExists)
        {
            return res.status(400).json({
                message:"USER NOT FOUND PLEASE SIGNUP"
            })
        }

        const isPasswordMatched = await bcrypt.compare(password,userExists.password)

        if(isPasswordMatched)
        {
            const token = jwt.sign({
                userId:userExists._id
            },process.env.JWT_SECRET_USER)

            return res.status(200).json({
                token
            })

        }else{
            message:"INCORRECT PASSWORD"
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"INTERNAL SERVER ERROR"
        })
    }

}

const userControllerMe = async (req,res)=>{
    const userId = req.userId;

    try {
        
        const user = await userModel.findOne({_id:userId})
        return res.status(200).json({
            email:user.email
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"INTERNAL SERVER ERROR"
        })
    }
 


}

const userControllerCoursePurchase = async (req,res)=>{

    const userId = req.userId;

    const {courseId} = req.body;

    if(!courseId)
    {
        return res.status(400).json({
            message:"PLEASE SEND THE COURSE ID"
        })
    }

    try {

        const isAlreadyPurchased = await purchaseModel.findOne({
            userId,
            courseId
        })

        if(isAlreadyPurchased)
        {
            return res.status(400).json({
                message:"YOU ALREADY PURCHASED THE COURSE",
                purchaseId:isAlreadyPurchased._id
            })
        }

        const purchase = await purchaseModel.create({
            userId,
            courseId
        })

        return res.status(200).json({
            message:"USER PURCHASED THE COURSE SUCCESSFULLY",
            purchaseId : purchase._id
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"INTERNAL SERVER ERROR"
        })
        
    }


}

const userControllerGetPurchasedCourses = async(req,res)=>{

    const userId = req.userId;

    try {

        const purchasedCourses = await purchaseModel.find({userId}).populate({
            path:'courseId',
            populate:{
                path:'createrId',
                select:'email firstName'
            }
        }).exec();

        return res.status(200).json({
            purchasedCourses
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"INTERNAL SERVER ERROR"
        })
    }

}




module.exports = {userControllerSignup,userControllerSignin,userControllerCoursePurchase,userControllerGetPurchasedCourses,userControllerMe}