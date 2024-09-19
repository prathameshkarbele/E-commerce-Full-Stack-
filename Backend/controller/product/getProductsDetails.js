const productModel = require("../../Model/productModel");

const getProdcutsDetails = async( req, res) =>{
  try {
   const {prodcutId} = req.body

   const ProductDetails = await productModel.findById(prodcutId);

   res.json({
    message: "Product Details",
    data: ProductDetails,
    success: true,
    error: false,
    
  });
    
  } catch (error) {
    res.status(400).json({
        message: error.message || error,
        error: true,
        success: false,
      });
  }
}
module.exports = getProdcutsDetails;