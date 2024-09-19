const productModel = require("../../Model/productModel")
const uploadProductPermission = require("../../helpers/permission");

const updateProductController = async (req, res) => {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission Denied");
    }

    const { _id, ...resBody} = req.body;
   console.log(resBody, "body")
    const updateProduct = await productModel.findByIdAndUpdate(_id,resBody);

    console.log(updateProduct, "updateProductdfdggdg")

    res.json({
      message: "Product Update Succesfully",
      data: updateProduct,
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
};

module.exports = updateProductController;