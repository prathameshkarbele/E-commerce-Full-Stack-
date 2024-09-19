const mongoose = require('mongoose')

const cartProdcut = mongoose.Schema({
    productId:{
        ref:"product",
        type:String
    },
    quantity:Number,
    userId:String,
},{
    timestamps: true
})

const CartproductModel = mongoose.model("CartProduct",cartProdcut)

module.exports = CartproductModel