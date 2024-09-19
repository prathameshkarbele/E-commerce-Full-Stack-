const productModel = require("../../Model/productModel");

const UsersearchProduct = async(req,res) =>{
  try {
    const query = req.query.q
    
    const regex = new RegExp(query, 'ig');
    const product = await productModel.find({
      "$or":[
        {
          productName:regex
        },{
          category:regex
        }
      ]
    })
    res.json({ 
      message: "Serch Product",
      data : product,
      error:false,
      success:true,
  })

  } catch (error) {
    res.status(400).json({ 
        message: error.message || error,
        error:true,
        success:false,
    })
  }
}
module.exports = UsersearchProduct