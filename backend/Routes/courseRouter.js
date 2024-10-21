const {Router} = require("express")
const {userMiddleware} = require("../Middleware/user")
const {userControllerCoursePurchase} = require("../Controllers/userController")
const {courseModel} = require("../db")
const courseRouter = Router();


courseRouter.post("/purchase",userMiddleware,userControllerCoursePurchase)
courseRouter.get("/preview",async (req,res)=>{

    try {

        const AllCourses  = await courseModel.find({}).populate({
            path:'createrId',
            select:'email firstName lastName'
        })

        return res.status(200).json({
            AllCourses
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"INTERNAL SERVER ERROR"
        })
    }

})


module.exports = {courseRouter}