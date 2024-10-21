const express = require("express")
const dotenv = require("dotenv")
const {adminRouter} = require("./Routes/adminRouter.js")
const {userRouter} = require("./Routes/userRouter")
const {courseRouter} = require("./Routes/courseRouter")
dotenv.config();
const app = express();
const cors = require("cors")
const mongoose = require("mongoose") 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connect(process.env.URI).then(()=>{
    console.log("Sucessfully connected to the mongodb");
}).catch((error)=>{
    console.log("Failed to connect the mongodb database");
    
})
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use(express.json())
app.use(cors());



app.use("/api/v1/admin",adminRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/course",courseRouter)



app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
    
})