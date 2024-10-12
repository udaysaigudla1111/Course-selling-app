const {z} = require("zod")
const {adminModel} = require("../db.js")
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

module.exports = {adminControllerSignup,adminControllerSignin}