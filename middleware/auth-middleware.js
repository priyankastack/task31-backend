const jwt=require('jsonwebtoken');
const register=require('../models/model');




const authmiddelware=async(req,res,next)=>{
    const token = req.header("Authorization");
    try {
        if(!token){
            return res.staus.json({
                message:"Unauthorised access",
                success:false,
                
            });
        }
        else{
            const jwtToken = token.replace("Bearer", "").trim();
            const verified=jwt.verify(jwtToken,process.env.SECRET_KEY);
            const userData=await register.findOne({email:verified.email}).select({
                password:0
            });
            req.user=userData;
            req.token=token;
            req.id=userData._id;
            next();
        }
         
    } catch (error) {
         res.status(500).json({
          message:error.message,
          success:false,
         });
         console.log(error);
    }
}


module.exports= authmiddelware;