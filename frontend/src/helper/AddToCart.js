import SummaryApi from "../common";
import { toast } from "react-toastify";

const addToCart = async(e,id) =>{
  e?.stopPropagation();
  e?.preventDefault()
//   console.log(id, "iddd")

const responce = await fetch(SummaryApi.AddToCartProduct.url,{
  method: SummaryApi.AddToCartProduct.method,
  credentials:"include",
  headers:{
    "content-type":"application/json"
  },
  body :JSON.stringify(
    {productId: id}
  )
})
const responceData = await responce.json();

if(responceData.success){
  
  toast.success(responceData?.message)
}
if(responceData.error){
  
  toast.error(responceData?.message)
}

return responceData;

}
export default addToCart;