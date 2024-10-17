const {z} = require("zod")
const {adminModel,courseModel} = require("../db.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const adminControllerSignup = async (req,res)=>{

    const {email,password,firstName,lastName} = req.body

    const requiredBody = z.object({
        email:z.string().min(5).max(30).trim().email(),
        password:z.string().min(3).max(22),
        firstName:z.string().trim().min(3).max(20),
        lastName:z.string().min(3).max(30).trim()
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

        const adminExists = await adminModel.findOne({email})

        if(adminExists)
        {
            return res.status(400).json({
                message:"ADMIN ALREADY EXISTS"
            })
        }

        const hashedPassword = await bcrypt.hash(password,5)

        const admin = await adminModel.create({
            email,
            password:hashedPassword,
            firstName,
            lastName
        })

        return res.status(200).json({
            message:"ADMIN SIGNEDUP SUCCESSFULLY",
            admin  
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"INTERNAL SERVER ERROR"
        })
    }


}

const adminControllerSignin = async (req,res)=>{

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

        const adminExists = await adminModel.findOne({email})

        if(adminExists)
        {
              const isPasswordMatched = await bcrypt.compare(password,adminExists.password)

              if(isPasswordMatched)
              {
                    const token = jwt.sign({
                        adminId:adminExists._id
                    },process.env.JWT_SECRET_ADMIN)
                
                    return res.status(200).json({
                        token
                    })
              }
              else{
                return res.status(400).json({
                    message:"INCORRECT PASSWORD"
                })
              }
        }
        else{
            return res.json({
                message:"ADMIN NOT FOUND PLEASE SIGNUP"
            })
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"INTERNAL SERVER ERROR"
        })
        
    }

  

}
const adminControllerMe = async (req,res)=>{

    const adminId = req.adminId;

    try {
        const admin = await adminModel.findOne({_id:adminId})

        return res.status(200).json({
            email:admin.email
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"INTERNAL SERVER ERROR"
        })
    }

}

const adminControllerCourse = async(req,res)=>{

    const adminId = req.adminId;

    const {title,description,price,imageUrl} = req.body;

    try {

        const course = await courseModel.create({
            title,
            description,
            price,
            imageUrl,
            createrId:adminId
        })

        return res.status(200).json({
            message:"COURSE CREATED SUCCESSFULLY",
            course
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"INTERNAL SERVER ERROR"
        })
        
    }


}

const adminControllerGetCourses = async(req,res)=>{

    const adminId = req.adminId;

    try 
    {
        const Courses = await courseModel.find({createrId:adminId}).populate({
            path:'createrId',
            select:'email -_id'
        }).exec();   
        
        return res.status(200).json({
            Courses
        })
    } 
    catch (error)
     {
        console.log(error);
        return res.status(500).json({
            message:"INTERNAL SERVER ERROR"
        })
    }

}

const adminControllerUpdateCourse = async(req,res)=>{

    const adminId = req.adminId;

    const {title,description,price,imageUrl,courseId} = req.body;

    try {

        const course = await courseModel.findOne({_id:courseId})

        if(course.createrId.toString()!==adminId)
        {
            console.log(course.createrId);
            
            return res.status(400).json({
                message:"THE COURSE ID DOES NOT BELONGS TO ADMIN"
            })
        }

        const updatedCourse = await courseModel.findByIdAndUpdate({_id:courseId},{
            title,
            description,
            price,
            imageUrl
        },{
            new:true,
            runValidators:true
        })

        return res.status(200).json({
            message:"Course Updated successfully",
            updatedCourse
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"INTERNAL SERVER ERROR"
        })
        
    }


}

module.exports = {adminControllerSignup,adminControllerSignin,adminControllerMe,adminControllerCourse,adminControllerGetCourses,adminControllerUpdateCourse}