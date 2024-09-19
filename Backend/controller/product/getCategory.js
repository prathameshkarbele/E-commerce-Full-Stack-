const productModel = require("../../Model/productModel")

const getCategoryProduct = async(req,res)=>{
  try {
    const ProductCategory = await productModel.distinct("category")


    //aarray to store one Product from Each Category
    const ProductByCategory = [];

    for (const category of ProductCategory) {
      const product = await productModel.findOne({category});
      
  
      if (product) {
          ProductByCategory.push(product);
      }
  }
  res.json({
    message:"Product Category",
    data:ProductByCategory,
    success:true,
    error:false
  })
    
  } catch (error) {
    res.status(400).json({
        message:error.message || error,
        error:true,
        success:false,
    })
  }
}
module.exports = getCategoryProduct;