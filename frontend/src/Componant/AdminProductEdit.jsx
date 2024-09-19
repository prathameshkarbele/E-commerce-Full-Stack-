import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import productCategories from "../helper/ProductCategories";
import { MdOutlineCloudUpload } from "react-icons/md";
import UploadImages from "../helper/UploadImages";
import { MdDelete } from "react-icons/md";
import DisplayImage from "./DisplayImage";
import SummaryApi from "../common";
import {toast} from "react-toastify"

const AdminProductEdit = ({productData, onclose, fetchData}) => {
    

const [data, setData] = useState({
    ...productData,
        productName:productData?.productName,
        brandName: productData?.brandName        ,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.productName,
        price: productData?.price,
        SellingPrice:productData?.SellingPrice,
});
const [openFullscreenImage, setopenFullscreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  console.log(data, "data");
  const handleOnchnage = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProducts = async (e) => {
    const file = e.target.files[0];

    const uploadImageCloudinary = await UploadImages(file);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };
  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const response = await fetch(SummaryApi.UpdateProduct.url,{

      method: SummaryApi.UpdateProduct.method,
      credentials:"include",
      headers:{
        "content-type": "application/json"
      },
      body : JSON.stringify(data)
    })

    const responceData = await response.json()

   console.log(responceData, "responceData")

    if(responceData.success){
      toast.success(responceData?.message)
      onclose()
      fetchData()
    }
    if(responceData.error){
      toast.error(responceData?.message)
    }
  
  };
  return (
    <div className=" fixed w-full h-full bg-red-950  bg-opacity-35 top-0   left-0 bottom-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%]  overflow-y-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg"> Edit Products</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onclose}
          >
            <MdClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name :</label>
          <input
          required
            type="text"
            id="productName"
            placeholder="Enter Product Name"
            name="productName"
            value={data.productName}
            onChange={handleOnchnage}
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="brandName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="Enter brand Name"
            name="brandName"
            value={data.brandName}
            onChange={handleOnchnage}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="category" className="mt-3">
            Category :
          </label>

          <select
            value={data.category}
            className="p-2 bg-slate-100 border rounded"
            name="category"
            onChange={handleOnchnage}
            required
          >
            <option value={""}>Select Category</option>
            {productCategories.map((ele, idx) => {
              return (
                <option value={ele.value} key={ele.value + idx}>
                  {ele.label}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="productImage">
            <div className="p-2 bg-slate-100 border rounded h-[300px] w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2 ">
                <span className="text-4xl">
                  {" "}
                  <MdOutlineCloudUpload />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="productImage"
                  name="productImage"
                  className="hidden"
                  onChange={handleUploadProducts}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-3">
                {data.productImage.map((el, index) => {
                  return (
                    <div className=" relative group ">
                      <img
                        src={el}
                        width={80}
                        height={80}
                        className=" bg-slate-100 border cursor-pointer"
                        alt={el}
                        onClick={() => {
                          setopenFullscreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 text-white bg-red-600 p-1 rounded-full hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                    ////
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *Please Upload Product Image
              </p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price :
          </label>
          <input
            type="Number"
            required
            id="price"
            placeholder="Enter price"
            name="price"
            value={data.price}
            onChange={handleOnchnage}
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="SellingPrice" className="mt-3">
            SellingPrice :
          </label>
          <input
            type="Number"
            required
            id="SellingPrice"
            placeholder="Enter SellingPrice"
            name="SellingPrice"
            value={data.SellingPrice}
            onChange={handleOnchnage}
            className="p-2 bg-slate-100 border rounded"
          />
          <label htmlFor="description" className="mt-3">
            description :
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            name="description"
            rows={3}
            value={data.description}
            placeholder="Enter Product Decription"
            onChange={handleOnchnage}
          ></textarea>
          <button className="px-2 py-2 bg-red-600 hover:bg-red-700 text-white mb-10 rounded-md">
            Edit Product
          </button>
        </form>
      </div>
      {openFullscreenImage && (
        <DisplayImage
          imgUrl={fullScreenImage}
          onClose={() => setopenFullscreenImage(false)}
        />
      )}
    </div>
  )
}

export default AdminProductEdit