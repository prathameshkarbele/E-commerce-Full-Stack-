const productModel = require("../../Model/productModel");

const FilteredProduct = async(req, res) => {
  try {
    const categoryList = req?.body.category || [];
    const Product = await productModel.find({
      category: {
        $in: categoryList,
      },
    });
    res.json({
      message: "categoryList Prodcut Get Succesfully ",
      data: Product,
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
module.exports = FilteredProduct;
