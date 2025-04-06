const register = require("../models/model");
const bcrypt = require("bcryptjs");

const registration = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const userExist = await register.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({
        message: "User Already Exist!",
        success: false,
      });
    }

    const saltRound = 10;
    const hash_password = await bcrypt.hash(password, saltRound);
    const newUser = await register.create({
      name,
      email,
      phone,
      password: hash_password,
    });
    res.status(200).json({
      message: "Registration successfull",
      success: true,
      data: newUser,
      token: await newUser.generateToken(),
      user_id: newUser.id.toString(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration Failed",
      success: false,
    });
    console.log(error);
  }
};




const login=async(req,res)=>{
    const{email,password}=req.body;
    try {
        const userExist=await register.findOne({email});
        if(!userExist){
            return res.status(400).json({
                message:"User not exist",
                status:false,
            });
        }
       
            const isPassword=await bcrypt.compare(password,userExist.password);
            if(isPassword){
             return  res.status(200).json({
                message:"Login Successfull",
                data:userExist,
                success:true,
                token:await userExist.generateToken(),
                user_id:userExist.id
            });
            }
           
    } catch (error) {
        res.status(500).json({
         message:"Login Failed",
         success:false
        });
        console.log(error)
    }
}

const users=async(req,res)=>{
  try {
    const user=req.user;
      if(!user){
        return res.status(400).json({
          message:"Unauthorised access",
          status:false
        });
      }else{
        return res.status(200).json({
          message:`Welcome${user.name}`,
          success:true,
          data:user
         });
      }
      
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:error.message,
      success:false
    });
  }
}

module.exports = {registration,login,users};
