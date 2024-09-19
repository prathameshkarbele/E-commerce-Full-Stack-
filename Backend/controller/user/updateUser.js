const userModel = require("../../Model/userModel")

async function updateUser(req,res){
    try {
        const sessionUser = req.userId

        const {userId,email, name, role} = req.body

     

        const payload = {
            ...(email && {email : email}),
            ...(name && {name : name}),
            ...(role && {role : role}),

        }
        const user = await userModel.findById(sessionUser)
        

        

        const upadateUser = await userModel.findByIdAndUpdate(userId,payload)
        

        res.json({
            data:upadateUser,
            message:"User Updated Succesfuly",
            error:false,
            success:true,
        })
        
    } catch (error) {
        res.status(400).json({
           
            message: error.message || error,
            error:true,
            success:false,
        })
    }

}
 module.exports = updateUser;