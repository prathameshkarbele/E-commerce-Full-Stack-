import React, { useState } from "react";
import LoginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageToBase64 from "../helper/imageToBase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [password, SetShowPassword] = useState(false);
  const [confirmPassword, SetconfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate()

  const HandleChnage = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponce = await fetch(SummaryApi.singUp.url, {
        method: SummaryApi.singUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const datacheck = await dataResponce.json();
      
     console.log(datacheck,"datacheck")
      if (datacheck.success) {
        toast.success(datacheck.meassage);
        navigate("/login")
       
      }
      if (datacheck.error) {
        toast.error(datacheck.message);
       
      }
    } else {
      toast.error("Please check Password and ConfirmPassword are Matched");
      
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageToBase64(file);

    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };

 
  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm  mx-auto">
          <div className="w-20 h-20 mx-auto relative  overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || LoginIcon} alt="login Icon" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2  cursor-pointer  text-center absolute w-full  bottom-0">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name: </label>
              <div className=" bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  onChange={HandleChnage}
                  value={data.name}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>
            <div className="grid">
              <label>Email: </label>
              <div className=" bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={HandleChnage}
                  value={data.email}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password: </label>
              <div className="flex  bg-slate-100 p-2">
                <input
                  type={password ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full h-full outline-none bg-transparent"
                  name="password"
                  onChange={HandleChnage}
                  value={data.password}
                  required
                />
                <div
                  className=" cursor-pointer text-xl"
                  onClick={() => SetShowPassword((prev) => !prev)}
                >
                  <span>{password ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
            </div>
            <div>
              <label>Confirm Password: </label>
              <div className="flex  bg-slate-100 p-2">
                <input
                  type={confirmPassword ? "text" : "password"}
                  placeholder="Enter confirmPassword"
                  className="w-full h-full outline-none bg-transparent"
                  name="confirmPassword"
                  onChange={HandleChnage}
                  value={data.confirmPassword}
                  required
                />
                <div
                  className=" cursor-pointer text-xl"
                  onClick={() => SetconfirmPassword((prev) => !prev)}
                >
                  <span>{confirmPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full  hover:scale-110 transition-all mx-auto block mt-6">
              Sign Up
            </button>
          </form>
          <p className="my-5">
            Already have Account ?{" "}
            <Link
              to={"/login"}
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
