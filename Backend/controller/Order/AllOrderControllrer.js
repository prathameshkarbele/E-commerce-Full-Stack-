const orderModel = require("../../Model/OrderProductModel");
const userModel = require("../../Model/userModel");

const AllOrderController = async(req,res) =>{

    const userId= req?.userId;
    const user = await userModel.findById(userId)

    if(user.role !=="ADMIN"){
        return req.status(500).json({
            message: "not Acesss"
        })

    }
    const AllOrder = await orderModel.find().sort({createdAt:-1})
    return res.status(200).json({
        data:AllOrder,
        success:true
    })



}
module.exports = AllOrderController