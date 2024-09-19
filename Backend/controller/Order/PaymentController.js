const stripe = require('../../config/stripe');
const userModel = require('../../Model/userModel');

const PaymentController = async(req, res) =>{
  try {
  const {cartItems} = req.body;


  const user = await userModel.findOne({
    _id:req.userId
  })

  const params = {
    submit_type :'pay',
    mode:"payment",
    payment_method_types:['card'],
    billing_address_collection: 'auto',
    shipping_options:[
      {
        shipping_rate:'shr_1PtWeaSCUG6seJqnlLXDgrKW'
      }
    ],
    customer_email:user.email,
    payment_intent_data: {
      shipping: {
        name: user.name, // Assuming you have `user.name` stored in the user model
        address: {
          line1:"p1", // Add corresponding fields for the address
          line2: "p2",
          city: "mumbai",
          state: "maharastra",
          postal_code: "400066",
          country: "india"
        }
      }
    },
    metadata:{
       userId:req.userId
    },
    line_items: cartItems.map((item, index)=>{  
      return{
        price_data:{
          currency :'inr',
          product_data:{
            name: item.productId.productName,
            images: item.productId.productImage,
            metadata:{
              productId : item.productId._id
            }
          },
          unit_amount: item.productId.SellingPrice * 100
        },
        adjustable_quantity:{
          enabled: true,
          minimum :1,
        },
        quantity:item.quantity
      }
    }),
    success_url:`${process.env.FRONTEND_URL}/success`,
    cancel_url:`${process.env.FRONTEND_URL}/cancel`

  }
  const session = await stripe.checkout.sessions.create(params)
   res.status(303).json(session)    
  } catch (error) {
    res.json({
        message: error.message || error,
        error: true,
        success: false,
      });
  }
}
module.exports = PaymentController