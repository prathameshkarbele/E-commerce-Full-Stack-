import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import displayINRCurrency from "../helper/displayCurrency";
import CategoryWiseProduct from "../Componant/CategoryWiseProduct";
import addToCart from "../helper/AddToCart";
import Context from "../Context";
function ProdcutDetails() {
  const [productsDetailsData, setProductsDetailsData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: Number,
    SellingPrice: Number,
  });
  const [loading, setLoading] = useState(false);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setactiveImage] = useState("");
  const [zoomImageCoordinate, setzoomImageCoordinate] = useState({
    x:0,
    y:0
  })
  const [zoomImage,setZoomImage] = useState(false)
  const params = useParams();
  const {fetchUserAddtoCart} = useContext(Context)
  const navigate = useNavigate()
  const ProductsDetailsResponce = async () => {
    setLoading(true);
    const responce = await fetch(SummaryApi.ProductDetails.url, {
      method: SummaryApi.ProductDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        prodcutId: params?.id,
      }),
    });
    setLoading(false);
    const DetailsProducts = await responce.json();
    setProductsDetailsData(DetailsProducts?.data);
    setactiveImage(DetailsProducts?.data?.productImage[0]);
  };

  useEffect(() => {
    ProductsDetailsResponce();
  }, [params]);

 const handleImageUrlOnHover = (imageUrl) =>{
  setactiveImage(imageUrl);
  }
const handleZoomImage = useCallback((e) =>{
  setZoomImage(true)
  const {left, top, width, height} = e.target.getBoundingClientRect()
  const x = (e.clientX - left) / width
  const y = (e.clientY - top) / height


  setzoomImageCoordinate({
    x,
    y
  })
 
},[zoomImageCoordinate])

const handleImageZoomLeve = () =>{
  setZoomImage(false)
}
const handleAddToCart = async(e, id)=>{
    await addToCart(e, id)
    fetchUserAddtoCart();
}
const handleBuyProduct = async(e, id)=>{
    await addToCart(e, id)
    fetchUserAddtoCart();
    navigate("/cart")
}
  return (
    <div className="container mx-auto p-4 ">
      <div className=" min-h-[200px] flex flex-col  lg:flex-row gap-5">
        {/* Product Image */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply "
              onMouseMove={handleZoomImage}
              onMouseLeave={handleImageZoomLeve}
            />
            {/* product zoom */}
            {zoomImage && (
              <div className=" hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[520px] top-0">
            <div className=" w-full h-full min-h-[400px] min-w-[500px]  mix-blend-multiply transition-transform duration-300 ease-in-out scale-150" style={{
              // backgroundI:`url(${activeImage})`
               backgroundImage: `url(${activeImage})`,
               backgroundRepeat:'no-repeat',
               backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`, 
            }}></div>
            </div>
            )}
           
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollBar-none h-full">
                {productImageListLoading?.map((e, idx) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={"loadingImage"+idx}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollBar-none h-full">
                {productsDetailsData?.productImage?.map((imagesUrl, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={index}
                    >
                      <img
                        src={imagesUrl}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={()=>handleImageUrlOnHover(imagesUrl)}
                        onClick={()=>handleImageUrlOnHover(imagesUrl)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* Product Details */}
        {
          loading ? (
            <div className="grid gap-1 w-full">
          <p className="bg-slate-200 animate-pulse px-2 rounded-full inline-block h-6 lg:h-8 w-full "></p>
          <h2 className="text-2xl lg:text-4xl font-medium h-6 bg-slate-200 animate-pulse px-2 rounded-full w-full lg:h-8"></h2>
          <p className=" capitalize text-slate-400 bg-slate-200 h-6 animate-pulse min-w-[100px] rounded-full w-full lg:h-8"></p>
          <div className="flex items-center gap-0.5 bg-slate-200 h-6  animate-pulse rounded-full text-red-600 w-full lg:h-8">
            
          </div>

          <div className="flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl h-6 animate-pulse w-full lg:h-8">
            <p className="text-red-600 bg-slate-200 w-full"></p>
            <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
          </div>
          <div className="flex items-center gap-3 my-2 w-full">
            <button className="h-6 bg-slate-200 rounded-full animate-pulse w-full  lg:h-8"></button>
            <button className="h-6 bg-slate-200 rounded-full animate-pulse w-full lg:h-8"></button>
          </div>
          <div className="w-full">
            <p className="text-slate-600 font-medium my-1 h-6 bg-slate-200 rounded-full animate-pulse w-full lg:h-8"></p>
            <p className=" h-10 bg-slate-200 rounded-full animate-pulse w-full lg:h-8"></p>
          </div>
        </div>
          ):(
            <div className="flex flex-col gap-1">
          <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit ">{productsDetailsData?.brandName}</p>
          <h2 className="text-2xl lg:text-4xl font-medium">{productsDetailsData?.productName}</h2>
          <p className=" capitalize text-slate-400 ">{productsDetailsData?.category}</p>
          <div className="flex items-center gap-0.5 text-red-600 ">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfStroke />
          </div>

          <div className="flex items-center gap-2 text-2xl font-medium my-1 lg:text-3xl">
            <p className="text-red-600">{displayINRCurrency(productsDetailsData?.SellingPrice)}</p>
            <p className="text-slate-400 line-through">{displayINRCurrency(productsDetailsData?.price)}</p>
          </div>
          <div className="flex items-center gap-3 my-2 ">
            <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600  font-medium  hover:bg-red-600 hover:text-white" onClick={(e)=>handleBuyProduct(e,productsDetailsData?._id)}>Buy</button>
            <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] font-medium bg-red-600 text-white hover:text-red-600 hover:bg-white" onClick={(e)=>handleAddToCart(e,productsDetailsData?._id)}>Add To Cart</button>
          </div>
          <div>
            <p className="text-slate-600 font-medium my-1">Description :</p>
            <p>{productsDetailsData?.description}</p>
          </div>
        </div>
          )
        }
       
      </div>
      {productsDetailsData?.category && (
        <CategoryWiseProduct category={productsDetailsData?.category} heading={"Recomonded Products"}/>
    
      )}
      
    </div>
  );
}

export default ProdcutDetails;
