import React from "react";
import SucessImg from "../../src/assest/success.gif";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded">
      <img src={SucessImg} alt="success page" width={150} height={150} />
      <p className="text-green-600 font-bold text-xl ">Payment Succesfully</p>
      <Link to={"/order"} className="p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white ">See Order</Link>
    </div>
  );
};

export default SuccessPage;
