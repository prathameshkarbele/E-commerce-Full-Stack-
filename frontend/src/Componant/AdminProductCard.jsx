import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import AdminProductEdit from "./AdminProductEdit";
import displayINRCurrency from "../helper/displayCurrency";

const AdminProductCard = ({ product, fetchData }) => {
  const [editProduct, setEditProdcut] = useState(false);

  return (
    <div className="bg-white p-4 rounded">
    <div className="w-40">
    <div className="w-32 h-32 flex justify-center items-center">
    <img src={product?.productImage[0]} width={120} height={120} alt="" className=" object-fill mx-auto h-full" />
    </div>
    
    <h1 className=" text-ellipsis line-clamp-2">{product.productName}</h1>
    </div>
     
     <div>
     <p className=" font-semibold">
      {
        displayINRCurrency(product?.SellingPrice
)
      }
     </p>

     <div className="w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer" onClick={()=> setEditProdcut(true)}>
        <MdModeEdit />
      </div>
     </div>

      
      {editProduct && <AdminProductEdit productData={product} fetchData={fetchData}  onclose={()=>setEditProdcut(false)}/>}
    </div>
  );
};

export default AdminProductCard;
