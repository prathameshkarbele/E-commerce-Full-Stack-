
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './Componant/Header';
import Footer from './Componant/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './Context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './Store/userSlice';

function App() {
  const dispatch = useDispatch()
  const [cartProductCount, setcartProductCount] = useState(0);

  const fetchUserDetails = async() =>{
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include"
    });
    const dataApi = await dataResponse.json()
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }

  
  }
  const fetchUserAddtoCart = async() =>{
    const dataProductinCart = await fetch(SummaryApi.countAddToCartProduct.url, {
      method: SummaryApi.countAddToCartProduct.method,
      credentials: "include"
    });
    const countAddtoCart = await dataProductinCart.json()
    setcartProductCount(countAddtoCart?.data?.count)
      console.log(countAddtoCart, "hshhshshs")
  }

  useEffect(()=>{
    // user details 
    fetchUserDetails()
    // user cart Product
    fetchUserAddtoCart()
  },[])
  return (
    <>
    <Context.Provider value={{
            fetchUserDetails, // user details fetch
            cartProductCount, // current user add to cart count
            fetchUserAddtoCart
    }}>
     <ToastContainer
     position='bottom-right' 
      />
    <Header />
    <main className=' min-h-[calc(100vh-120px)] p-16'>
    <Outlet />
    </main>
      
      <Footer />

      </Context.Provider>
    </>
  );
}

export default App;
