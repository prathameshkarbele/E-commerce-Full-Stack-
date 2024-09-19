import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setcategoryProduct] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const categoryLoadingArr = new Array(13).fill(null);
 

  const getCategoryProduct = async () => {
    setCategoryLoading(true);
    const productCategory = await fetch(SummaryApi.ProductCategory.url);
    const productResponce = await productCategory.json();
    setCategoryLoading(false);
    setcategoryProduct(productResponce.data);
  };

  useEffect(() => {
    getCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex items-center gap-4  p-4 justify-between overflow-scroll scrollBar-none">
        {
            categoryLoading ? (
      
                categoryLoadingArr.map((ele,index) =>{
                return(
                    <div className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse" key={"categoryLoading"+index}></div>
                )
            })
   
          
        ) : (
          categoryProduct?.map((Product, index) => {
            return (
              <Link
                to={"/product-category?category="+ Product?.category}
                className=" cursor-pointer" key={Product?.category+index}
              >
                <div className="w-16 h-16 md:w-20  md:h-20  rounded-full overflow-hidden p-3 bg-slate-200 flex items-center justify-center hover:scale-125 transition-all" >
                  <img
                    src={Product?.productImage[0]}
                    alt={Product?.category}
                    className="h-full object-scale-down mix-blend-multiply"
                  />
                </div>
                <p className=" text-center text-sm md:text-base capitalize">
                  {Product?.category}
                </p>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategoryList;
