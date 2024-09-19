import React, { useContext, useState } from "react";
import SummaryApi from "../common";
import { useEffect } from "react";
import Context from "../Context";
import displayINRCurrency from "../helper/displayCurrency";
import {loadStripe} from '@stripe/stripe-js';
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const context = useContext(Context);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadingCart = new Array(context.cartProductCount).fill(null);
  const {fetchUserAddtoCart} = useContext(Context)

  const fetchData = async () => {
   
    try {
      const response = await fetch(SummaryApi.AddToCartProductView.url, {
        method: SummaryApi.AddToCartProductView.method,
        credentials: "include",
      });
      const dataResponse = await response.json();

      if (dataResponse.success) {
        setData(dataResponse.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]); // Ensure data is empty if there's an error
    } 
  };
const handleLoading = async()=>{
  await fetchData();
}
  useEffect(() => {
    setLoading(true);
    handleLoading()
    setLoading(false);
  }, []);

  const increaseOty = async(id, qty) =>{
    console.log(id, "id")
    const response = await fetch( SummaryApi.UpdateCartProduct.url,{
     method:SummaryApi.UpdateCartProduct.method,
     credentials:"include",
     headers :{
      "content-type":"application/json"
     },
     body: JSON.stringify({
      quantity: qty + 1,
      _id:id

      
     })
    })
   const responseData = await response.json();

    if(responseData.success){
      fetchData()
    }
  }
  const DecreaseOty = async(id, qty) =>{
    if(qty>=2){
      const response = await fetch( SummaryApi.UpdateCartProduct.url,{
        method:SummaryApi.UpdateCartProduct.method,
        credentials:"include",
        headers :{
         "content-type":"application/json"
        },
        body: JSON.stringify({
         quantity: qty - 1,
         _id:id
         
        })
       })
      const responseData = await response.json();
   
       if(responseData.success){
         fetchData()
       }
    }
    
  }
  const DeleteProductCart = async(id) =>{
      const response = await fetch( SummaryApi.DeleteCartProduct.url,{
        method:SummaryApi.DeleteCartProduct.method,
        credentials:"include",
        headers :{
         "content-type":"application/json"
        },
        body: JSON.stringify({
         _id:id
         
        })
       })
      const responseData = await response.json();
   
       if(responseData.success){
         fetchData()
         fetchUserAddtoCart()
       }

    
  }
  const handlePayment = async() =>{
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const PaymentReponce = await fetch(SummaryApi.Payment.url,{
      method: SummaryApi.Payment.method,
      credentials:"include",
      headers:{
        "content-type":'application/json'
      },
      body:JSON.stringify({
        cartItems:data
      })
    })

    const responceData = await PaymentReponce.json();
    console.log(responceData, "res")

    if(responceData?.id){
      stripePromise.redirectToCheckout({sessionId:responceData.id})
    }
  }

const totalQty = data.reduce((prevValue, CurrValue) =>prevValue+CurrValue.quantity,0)
const TotalAmount = data.reduce((prevValue, CurrValue) =>prevValue+(CurrValue?.productId?.SellingPrice * CurrValue.quantity),0)
  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data?.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* view Products */}
        <div className="w-full max-w-3xl ">
          {loading
            ? loadingCart?.map((el, idex) => (
                <div
                  key={idex + "Add to cart Loading"}
                  className="w-full bg-slate-200 h-36 my-2 border border-slate-200 animate-pulse rounded"
                ></div>
              ))
            : data?.map((product, index) => (
                <div
                  key={product?._id + "Add to cart Loading"}
                  className='w-full bg-white  h-32 my-2 border border-slate-200  rounded flex'
                >
                  <div className="w-32 h-32  bg-slate-200">
                    <img
                      src={product?.productId?.productImage[0]}
                      alt="Productcart"
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className="px-4 py-2 w-full relative ">
                  {/* Delete Product */}
                  <div className= "absolute right-0 text-xl text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer" onClick={()=>DeleteProductCart(product?._id)}>
                  <MdDelete />
                  </div>
                    <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">{product?.productId?.productName}</h2>
                    <p className="capitalize text-slate-500">{product?.productId?.category}</p>
                    <div className="flex justify-between items-center">
                    <p className="text-red-600 font-medium text-lg">{displayINRCurrency(product?.productId?.SellingPrice)}</p>
                    <p className="text-slate-600 font-semibold text-lg">{displayINRCurrency(product?.productId?.SellingPrice * product?.quantity)}</p>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-1">
                      <button className="p-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "  onClick={()=>DecreaseOty(product?._id, product?.quantity)}>-</button>
                      <span>{product?.quantity}</span>
                      <button  onClick={()=>increaseOty(product?._id, product?.quantity)} className="p-1 border border-red-600 text-red-600 w-6 h-6 hover:bg-red-600 hover:text-white flex justify-center items-center rounded">+</button>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Summary Product */}
        {data[0] &&
          <div className="mt-5 lg:mt-0 w-full max-w-md ">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse">
              Total
            </div>
          ) : (
            <div className="h-36 bg-slate-200">
              <h2 className="text-white bg-red-600 px-4 py-1 ">Summary</h2>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
              <p>Quantity:</p>
                <p>{totalQty}</p>
              </div>
              <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
              <p>TotalPrice:</p>
                <p>{displayINRCurrency(TotalAmount)}</p>
              </div>
              <button className=" bg-[#ff9900] p-3 text-white w-full mt-2" onClick={handlePayment}>Process To Buy</button>
            </div>
          )}
        </div> }
       
      </div>
    </div>
  );
};

export default Cart;
