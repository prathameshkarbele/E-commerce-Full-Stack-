const stripe = require("../../config/stripe");
const CartproductModel = require("../../Model/cartProduct");
const orderModel = require("../../Model/OrderProductModel");

const endpointSecrete = process.env.STRIPE_ENDPOINT_WEBHOOK_SECRET_KEY;

const getLineItems = async (lineItems) => {
  console.log(lineItems, "lineItems")
  console.log(lineItems?.data,"lineItems")
  console.log(lineItems?.data.price,"lineItems")
  let ProductItems = [];
  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;
    // console.log(product, "product")
      const productData = {
        productId: productId,
        name: product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: product.images,
      };
      
      ProductItems.push(productData);
  
    }
  }
  return ProductItems;
};
const webhooks = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  const payloadString = JSON.stringify(req.body);

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecrete,
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecrete
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
    
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );
      console.log(lineItems, "lineItems")
    
      const ProductDetails = await getLineItems(lineItems);
  // console.log(ProductDetails, "ProductDetails")
      const orderDetails = {
        productDetails: ProductDetails,
        email: session.customer_email,
        userId: session.metadata.userId,
        PaymentDetails: {
          paymentId: session.payment_intent,
          payment_method_type: session.payment_method_types,
          payment_status: session.payment_status,
        },
        shipping_options: session.shipping_options.map(s=>{
          return{
            ...s, shipping_amount:s.shipping_amount/100
          }
        }),
        totalAmount: session.amount_total / 100,
      };
      console.log(orderDetails)
      const order = new orderModel(orderDetails);
      const saveOrder = await order.save();
      console.log(session.metadata.userId, "userId from session metadata");
      if(saveOrder?.id){
       const deleteCardItems = await CartproductModel.deleteMany({ userId:session.metadata.userId });
      }

      // console.log(order, "ProductDetails");
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send();
};
module.exports = webhooks;
