import React, { useContext, useState } from "react";
import LoginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../Context";

const Login = () => {
    const [password, SetShowPassword] = useState(false)
    const navigate = useNavigate()
    const {fetchUserDetails,fetchUserAddtoCart} = useContext(Context)

   
    const [data, setData] = useState({
      email: "",
      password:""
    })

    const HandleChnage = (e) =>{
      const {name, value} = e.target

      setData((prev)=>{
        return{
          ...prev,
          [name]:value
        }
      })
    }
    const handleSubmit = async(e) =>{
     e.preventDefault()

     const dataResponce = await fetch(SummaryApi.singin.url,{
      method:SummaryApi.singin.method,
      credentials:"include",
      headers :{
        "content-type": "application/json"
      },
      body:JSON.stringify(data)
     })
     const dataApi = await dataResponce.json()

     if(dataApi.success){
      navigate("/")
      toast.success(dataApi.message)
      fetchUserDetails()
      fetchUserAddtoCart()
     }
     if(dataApi.error){
      toast.error(dataApi.message)
     }

    }


  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm  mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={LoginIcon} alt="login Icon" />
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email: </label>
              <div className=" bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={HandleChnage}
                  value={data.email}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password: </label>
              <div className="flex  bg-slate-100 p-2">
                <input
                  type={password ? "text": "password"}
                  placeholder="Enter password"
                  className="w-full h-full outline-none bg-transparent"
                  name="password"
                  onChange={HandleChnage}
                  value={data.password}
                />
                <div className=" cursor-pointer text-xl" onClick={()=>SetShowPassword((prev) => !prev )}>
                  <span>
                  {password ? (<FaEye />):(  <FaEyeSlash />)}
                  
                  </span>
                </div>
              </div>
              <Link to={"/Forgot-Password"} className="block w-fit ml-auto hover:underline hover:text-red-600"> Forgot Password ?</Link>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full  hover:scale-110 transition-all mx-auto block mt-6">Login</button>
          </form>
          <p className="my-5">Don't have Account ? <Link to={"/signup"} className=" text-red-600 hover:text-red-700 hover:underline">Sing Up</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
