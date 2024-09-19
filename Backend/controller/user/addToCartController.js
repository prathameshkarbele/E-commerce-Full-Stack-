const CartproductModel = require("../../Model/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req.body;

    const currentUser = req.userId;

    const isProductAvailable = await CartproductModel.findOne({ productId, userId: currentUser,  });

    if (isProductAvailable) {
      return res.json({
        message: "Product Already Exits in Add To cart ",
        error: true,
        success: false,
      });
    }
    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
    };

    const newAddToCart = new CartproductModel(payload);
    const saveProduct = await newAddToCart.save();

   return res.json({
      data:saveProduct,
      message: "Product is Add To cart ",
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
module.exports = addToCartController;
