import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategories from "../helper/ProductCategories";
import CategoryWiseProduct from "../Componant/CategoryWiseProduct";
import VerticalCart from "../Componant/VerticalCart";
import SummaryApi from "../common";

const CategoryProduct = () => { 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const location = useLocation();
   const navigate = useNavigate()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListArray = urlSearch.getAll("category")

  const urlCategoryListObject = {};
  urlCategoryListArray.forEach(el=>{
    urlCategoryListObject[el] = true
  })
  const [selectProduct, setSelectProduct] = useState(urlCategoryListObject);
  const [filteredCatList, SetfilteredCatList] = useState([]);
  const [sortBy, setSortBy] = useState("")


  const fetchData = async () => {
    const responce = await fetch(SummaryApi.FilterProdcuts.url, {
      method: SummaryApi.FilterProdcuts.method,
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        category: filteredCatList,
      }),
    });
    const DataResponce = await responce.json();

    setData(DataResponce?.data || []);
  
  };
  const handleSelectedCategories = (e) => {
    const { name, value, checked } = e.target;
    setSelectProduct((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectProduct)
      ?.map((categoryKeyName) => {
        if (selectProduct[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);
    SetfilteredCatList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((ele,idx)=>{
      if((arrayOfCategory.length-1)===idx){
        return `category=${ele}`
      }
       return `category=${ele}&&`
    })
    navigate("/product-category?"+urlFormat.join())
  }, [selectProduct]);

  useEffect(() => {
    fetchData()
  }, [filteredCatList]);
  // {params?.categoryName}

  const handleSortByValue = (e) =>{
    const {value} = e.target
   setSortBy(value)
    if(value ==="asd"){
      setData((prev)=>prev.sort((a,b)=>a.SellingPrice - b.SellingPrice))
    }
    if(value ==="dcs"){
      setData((prev)=>prev.sort((a,b)=>b.SellingPrice - a.SellingPrice))
    }
  }
useEffect(()=>{

},[sortBy])

  return (
    <div className="container mx-auto p-4">
      {/* desktop version  */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* left side*/}
        <div className="bg-white p-2 min-h-[calc(100vh-140px)] overflow-y-scroll">
          {/* sort by */}
          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort By:{" "}
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex item-center gap-3">
                <input type="radio" name="sortBy" checked={sortBy==="asd"} value={"asd"} onChange={handleSortByValue} />
                <label>Price - Low to High</label>
              </div>
              <div className="flex item-center gap-3">
                <input type="radio" name="sortBy"  checked={sortBy==="dcs"} value={"dcs"} onChange={handleSortByValue}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>
          {/* filterd by */}

          <div className="">
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Category:{" "}
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategories?.map((CategoryName, idx) => {
                return (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="category"
                      checked={selectProduct[CategoryName?.value]}
                      id={CategoryName?.value}
                      value={CategoryName?.value}
                      onChange={(e) => handleSelectedCategories(e)}
                    />
                    <label htmlFor={CategoryName?.value}>
                      {CategoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        {/* right side Product */}
        <div className="px-1">
        <p className=" font-medium text-slate-800 text-lg my-2">Search Results : {data.length}</p>
        <div className=" min-h-[calc(100vh-120px)]  overflow-y-scroll max-h-[calc(100vh-120px)]">
        {data?.length !== 0 && (
            <VerticalCart loading={loading} data={data} />
          )}
        </div>
          
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
