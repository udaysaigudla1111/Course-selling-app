const {Router} = require("express")
const adminRouter = Router();
const {adminMiddleware} = require("../Middleware/admin.js")
const {adminControllerSignup,adminControllerSignin,adminControllerMe,adminControllerCourse,adminControllerGetCourses} = require("../Controllers/adminController.js")



adminRouter.post("/signup",adminControllerSignup)
adminRouter.post("/signin",adminControllerSignin)
adminRouter.get("/me",adminMiddleware,adminControllerMe)
adminRouter.post("/course",adminMiddleware,adminControllerCourse)
adminRouter.get("/bulk/course",adminMiddleware,adminControllerGetCourses)




module.exports = {adminRouter}