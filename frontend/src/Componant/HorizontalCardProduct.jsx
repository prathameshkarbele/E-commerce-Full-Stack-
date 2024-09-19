import React, { useContext, useEffect, useRef, useState } from "react";
import GetCategoryWiseProduct from "../helper/GetGategoryWiseProduct";
import displayINRCurrency from "../helper/displayCurrency";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helper/AddToCart";
import Context from "../Context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {fetchUserAddtoCart} = useContext(Context)
  const LoadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const scrollRight = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft += 300;
  };
  
  const fetchData = async () => {
    setLoading(true);
    const GetCategoryProduct = await GetCategoryWiseProduct(category);
    setLoading(false);
    setData(GetCategoryProduct.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddtoCartProduct = async(e,id) =>{
    console.log(id, "id")
    await addToCart(e,id)
    fetchUserAddtoCart()
  }
  return (
    <div className="container mx-auto px-4 my-6  relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>
      <div
        className="flex items-center gap-4  md:gap-6 overflow-scroll scrollBar-none  transition-all"
        ref={scrollElement}
      >
        <button
          onClick={scrollRight}
          className="bg-white shadow-md p-2 rounded-full absolute left-0 text-lg hidden md:block z-10"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={scrollLeft}
          className="bg-white shadow-md p-2 rounded-full absolute right-0 text-lg hidden md:block z-10"
        >
          <FaAngleRight />
        </button>

        {loading ? (
          LoadingList?.map((product, index) => {
            return (
              <div className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse">
                  {/* <img
                    src={product?.productImage[0]}
                    alt=""
                    className=" object-scale-down h-full hover:scale-110 transition-all"
                  /> */}
                </div>
                <div className="p-4 grid  w-full gap-2">
                  <h2 className=" font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 bg-slate-200 rounded-full animate-pulse">
                    {/* {product?.productName} */}
                  </h2>
                  <p className=" capitalize text-slate-500 p-1 bg-slate-200 rounded-full animate-pulse">
                    {/* {product?.category} */}
                  </p>

                  <div className="flex gap-3 w-full">
                    <p className="text-green-600 font-medium p-1 bg-slate-200 w-full rounded-full animate-pulse">
                      {/* {displayINRCurrency(product?.SellingPrice)} */}
                    </p>
                    <p className="text-slate-500 line-through  p-1 bg-slate-200 w-full rounded-full animate-pulse">
                      {/* {displayINRCurrency(product?.price)} */}
                    </p>
                  </div>
                  <button className="text-sm  text-white px-3 py-0.5 rounded-full bg-slate-200  w-full animate-pulse">
                    {/* Add t o Cart{" "} */}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          data?.map((product, index) => {
            return (
              <Link to={"product/"+ product?._id
} className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex">
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                  <img
                    src={product?.productImage[0]}
                    alt=""
                    className=" object-scale-down h-full hover:scale-110 transition-all"
                  />
                </div>
                <div className="p-4 grid">
                  <h2 className=" font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className=" capitalize text-slate-500 ">
                    {product?.category}
                  </p>

                  <div className="flex gap-3">
                    <p className="text-green-600 font-medium">
                      {displayINRCurrency(product?.SellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full" onClick={(e)=>handleAddtoCartProduct(e,product?._id)}>
                    Add t o Cart{" "}
                  </button>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
