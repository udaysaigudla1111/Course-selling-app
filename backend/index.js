const express = require("express")
const dotenv = require("dotenv")
const {adminRouter} = require("./Routes/adminRouter.js")
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



app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
    
})