const userModel = require("../../Model/userModel")
const bcrypt = require('bcryptjs')

async function userSignupController(req, res){
try {
     const {email,name, password} = req.body

   //   const user = await userModel.f({email})
   const user = await userModel.findOne({email})

  

     if(user){
      throw new Error("Already user exist")
     
     }

    

     if(!name){
        throw new Error("please Provide Name")
     }
     if(!email){
        throw new Error("please Provide email")
     }
     if(!password){
        throw new Error("please Provide password")
     }

     const salt = bcrypt.genSaltSync(10);
     const hashPassword = await bcrypt.hashSync(password, salt)

     if(!hashPassword){
        throw new Error("Something Went Wrong")
     }

     const payload = {
        ...req.body,
        role:"GENERAL",
        password:hashPassword
     }
     const userData = new userModel(payload)
     const saveUser = await userData.save()

     res.status(201).json({
        data: saveUser,
        success:true,
        error:false,
        meassage: "User Created Successfully"
     })

    
} catch (error) {
 
    res.json({
        message: error.message || error,
        error:true,
        success:false,
    })
}
}
module.exports = userSignupController