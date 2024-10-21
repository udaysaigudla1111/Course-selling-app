const {Router} = require("express")
const {userControllerSignup,userControllerSignin,userControllerGetPurchasedCourses,userControllerMe} = require("../Controllers/userController")
const {userMiddleware} = require("../Middleware/user")

const userRouter = Router();

userRouter.post("/signup",userControllerSignup)
userRouter.post("/signin",userControllerSignin)
userRouter.get("/me",userMiddleware,userControllerMe)
userRouter.get("/purchases",userMiddleware,userControllerGetPurchasedCourses)


module.exports = {userRouter}