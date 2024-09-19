const CartproductModel = require("../../Model/cartProduct");

const countAddToCartProduct = async(req,res) =>{
    try {
        const userId = req.userId;
       

        const count = await CartproductModel.countDocuments({
            userId: userId
        })
    
        res.json({
            data:{
                count:count
            },
            meassage:"ok",
            error:false,
            success:true
        })

        
    } catch (error) {
        res.status(400).json({
           
            message: error.message || error,
            error:true,
            success:false,
        })
    }
}
module.exports = countAddToCartProduct