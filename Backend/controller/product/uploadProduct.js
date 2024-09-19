const productModel = require("../../Model/userModel")
const uploadProductPermission = require("../../helpers/permission")

async function UploadProductController(req,res){
  try {
    const sessionUserId = req.userId

  

   if(!uploadProductPermission(sessionUserId)){
    throw new Error("Permission Denied")
   }

    const uploadProduct = new productModel(req.body)
    const saveProduct = await uploadProduct.save()
    

    res.status(201).json({
        message:"Product Upload successfully ",
        error:false,
        success:true,
        data:saveProduct,
    })
    
  } catch (error) {
    res.status(400).json({
        message:error.message || error,
        error:true,
        success:false,
    })
  }
}
module.exports = UploadProductController