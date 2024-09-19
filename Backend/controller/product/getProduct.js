const productModel = require("../../Model/productModel")


const getProductController = async(req,res) =>{

    const AllProduct = await productModel.find().sort({ createdAt: -1 })
    

    
   try {
    res.json({
        message:"AllProduct",
        error:false,
        success:true,
        data: AllProduct,
    })
   } catch (error) {
    res.status(400).json({
        message:error.message || error,
        error:true,
        success:false,
    })
   }
}

module.exports = getProductController