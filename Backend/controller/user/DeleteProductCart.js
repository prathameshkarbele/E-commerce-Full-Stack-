const CartproductModel = require("../../Model/cartProduct");

const DeleteProductCart = async(req,res) =>{
  try {
    const CurrentUserId = req.userId;
    const CurrentProductId = req.body._id;

    const DeleteProduct = await CartproductModel.deleteOne({_id: CurrentProductId})

    res.json({
        message:"Product Delete From Cart",
        data:DeleteProduct,
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
module.exports =DeleteProductCart