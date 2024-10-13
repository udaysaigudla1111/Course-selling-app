const jwt = require("jsonwebtoken")

const adminMiddleware = (req,res,next)=>{
    const token = req.headers.token;

    if(token)
    {   
        try {
            const decodedInfo = jwt.verify(token,process.env.JWT_SECRET_ADMIN)
            req.adminId = decodedInfo.adminId
            next();
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message:"RECEIVED DIFFERENT JWT SECRET"
            })
        }
        
    }
    else{
        return res.status(400).json({
            message:"TOKEN NOT FOUND"
        })
    }
}


module.exports = {adminMiddleware}