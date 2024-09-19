const userModel = require("../../Model/userModel")
async function AllUsers(req, res){



    try {
       
        const allUsers = await userModel.find()
        res.json({
            message : "all Users",
            data:allUsers,
            success: true,
            error: false

        })

    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error: true,
            success: false
        })
    }
}
module.exports = AllUsers