const productModel = require("../../Model/productModel");

const getCategoryWiseProduct =async(req, res) =>{
    
  try {
    const {category} = req?.body || req?.query
    const Product = await productModel.find({category})
    res.json({
        message: "CategoryWise Prodcut Get Succesfully",
        data: Product,
        success:true,
        error: false,
        
    })
  } catch (error) {
    res.status(400).json({
        message:error.message || error,
        error:true,
        success:false,
    })
  }
}
module.exports = getCategoryWiseProduct;