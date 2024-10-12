const {Router} = require("express")
const adminRouter = Router();
const {adminControllerSignup,adminControllerSignin} = require("../Controllers/adminController.js")



adminRouter.post("/signup",adminControllerSignup)
adminRouter.post("/signin",adminControllerSignin)






module.exports = {adminRouter}