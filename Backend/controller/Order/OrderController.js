const orderModel = require("../../Model/OrderProductModel");

const OrderController = async(req,res) =>{
   try {
    const currentUser = req.userId;
    const orderList = await orderModel.find({userId:currentUser}).sort({createdAt:-1})


        res.json({
            message : "orderList of all Users",
            data:orderList,
            success: true,
            error: false

        })
 

   } catch (error) {
    res.status(500).json({
        message: error.message || error,
        error: true,
        success: false,
      });
   }
}
module.exports = OrderController