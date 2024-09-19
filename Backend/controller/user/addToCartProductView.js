const CartproductModel = require("../../Model/cartProduct");

const addToCartProductView = async (req, res) => {
  try {


    const currentUser = req.userId;

    const allProduct = await CartproductModel.find({userId: currentUser }).populate("productId");


   return res.json({
      data: allProduct,
      error: false,
      success: true,
    })
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
module.exports = addToCartProductView;
