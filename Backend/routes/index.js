const express = require('express');

const router = express.Router()

const userSignupController = require('../controller/user/UserSignup');
const userSignInController = require('../controller/user/UserSignin');
const userDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleWare/authToken');
const userLogout = require('../controller/user/userLogout');
const AllUsers = require('../controller/user/Allusers');
const updateUser = require('../controller/user/updateUser');
const UploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategory');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProdcutsDetails = require('../controller/product/getProductsDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
const addToCartProductView = require('../controller/user/addToCartProductView');
const updateAddtoCartProduct = require('../controller/user/UpdateAddtoCartProduct');
const DeleteProductCart = require('../controller/user/DeleteProductCart');
const UsersearchProduct = require('../controller/product/UserSerchProduct');
const FilteredProduct = require('../controller/product/filteredProduct');
const PaymentController = require('../controller/Order/PaymentController');
const webhooks = require('../controller/Order/Webhook');
const OrderController = require('../controller/Order/OrderController');
const AllOrderController = require('../controller/Order/AllOrderControllrer');

//admin pannel 
router.get("/all-user",authToken,  AllUsers)
router.post("/update-user",authToken, updateUser)

//Product
router.post("/upload-product",authToken, UploadProductController)
router.get("/get-product",getProductController )
router.post("/update-product",authToken,updateProductController )
router.get("/get-productCategory",getCategoryProduct )
router.post("/category-product",getCategoryWiseProduct )
router.post("/product-Details",getProdcutsDetails)
router.post("/filter-product",  FilteredProduct)
router.get("/Serch", UsersearchProduct)

// user Add to Cart
router.post("/signup", userSignupController)
router.post("/signin", userSignInController)
router.get("/user-details",authToken, userDetailsController)
router.get("/userLogout", userLogout)
router.post("/addtoCart",authToken,  addToCartController)
router.get("/countAddToCartProduct",authToken,  countAddToCartProduct)
router.get("/view-card-product",authToken,  addToCartProductView)
router.post("/update-card-product",authToken,  updateAddtoCartProduct)
router.post("/Delete-card-product",authToken,  DeleteProductCart)

//payment and order
router.post("/checkout",authToken,  PaymentController)
router.post("/webhook",  webhooks)
router.get("/order-list",authToken,  OrderController)
router.get("/all-order",authToken,  AllOrderController)



module.exports = router