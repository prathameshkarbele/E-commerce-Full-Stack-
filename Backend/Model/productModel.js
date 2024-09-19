const mongoose = require('mongoose')

const productschema = mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    SellingPrice: Number,
},{
    timestamps: true
})

const productModel = mongoose.model("product",productschema)

module.exports = productModel