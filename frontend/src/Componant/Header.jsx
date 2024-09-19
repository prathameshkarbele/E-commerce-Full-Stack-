import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { BsSearch } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../Store/userSlice";
import ROLE from "../common/role";
import Context from "../Context";

const Header = () => {
  const [displayAdmin, setDisplayAdmin] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const context = useContext(Context)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  console.log(URLSearch,"URLSearch")
  console.log(searchQuery, "searchQuery")
  const [search, Setsearch] = useState(searchQuery);
console.log(search, "search")

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.Logout_user.url, {
      method: SummaryApi.Logout_user.method,
      credentials: "include",
    });

    const logout = await fetchData.json();

    

    if (logout.success) {
      toast.success(logout.message);
      dispatch(setUserDetails(null));
      navigate("/")
    }
    if (logout.error) {
      toast.error(logout.message);
    }
  };
  
  const handleSearch = (e) =>{
   const {value} = e.target;
   Setsearch(value)
   if(value){
    navigate(`/Serch?q=${value}`)
   }
   else{
    navigate(`/`)
   }
  }
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full flex items-center px-4 container mx-auto justify-between ">
        <div className="">
          <Link to={"/"}>
            <Logo w={90} h={64} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search product here...."
            className="w-full outline-none "
            onChange={(e)=>handleSearch(e)}
            value={search}
          />
          <div className="min-w-[50px] h-8 text-white bg-red-600 flex items-center  justify-center rounded-r-full text-lg">
            <BsSearch />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className=" relative  flex justify-center">
          {user?._id && (
            <div className="text-3xl cursor-pointer " onClick={()=>setDisplayAdmin((prev)=>!prev)}>
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="h-10 w-10 rounded-full  "
                  alt={user?.name}
                />
              ) : (
                <FaRegUserCircle  />
              )}
            </div>
          )}
            
            {displayAdmin && (
              <div className=" absolute bg-white h-fit  bottom-0 top-11 p-2 shadow-lg rounded  hover:bg-slate-200 ">
                <nav>
                {user?.role === ROLE.ADMIN &&
                  <Link to={"/admin-panel/all-products"} className=" whitespace-nowrap hidden md:block" onClick={()=>setDisplayAdmin((prev)=>!prev)}>
                    Admin Pannel
                  </Link>
                }
                <Link to={"/order"} className=" whitespace-nowrap hidden md:block" onClick={()=>setDisplayAdmin((prev)=>!prev)}>Order</Link>
                  
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
          <Link to={"/cart"} className="text-3xl cursor-pointer relative" >
            <span>
              <FaCartPlus />
            </span>
            
              <div className=" bg-red-600 text-white w-5 p-1  h-5 rounded-full  flex items-center justify-center absolute -top-1 -right-3">
              <p className="text-sm">{context?.cartProductCount}</p>
            </div>
          
          </Link>
        )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                to={"/"}
                className="px-3 py-1 rounded-full text-white bg-red-600  hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600  hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
