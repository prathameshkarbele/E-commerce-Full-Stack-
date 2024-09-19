const CartproductModel = require("../../Model/cartProduct");

const updateAddtoCartProduct = async(req,res) =>{
    try {

        const currentUserId = req.userId;
        const addToCartProductId = req.body._id


        const qty = req.body.quantity

       
        const UpdateProduct = await CartproductModel.updateOne(
            { _id: addToCartProductId }, 
            { ...(qty && { quantity: qty }) }  
          );
        res.json({
            message:"Product Updated",
            data:UpdateProduct,
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
module.exports = updateAddtoCartProduct;