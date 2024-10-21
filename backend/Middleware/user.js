const jwt = require("jsonwebtoken")

const userMiddleware = (req,res,next)=>{

    const token = req.headers.token;

    if(token)
    {
        try {

            const decodedInfo = jwt.verify(token,process.env.JWT_SECRET_USER)

            req.userId = decodedInfo.userId;

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

module.exports = {userMiddleware}