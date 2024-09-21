import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";
import '../App.css'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPannel = () => {
    const user = useSelector((state) => state?.user?.user);
    const navigate = useNavigate()

    useEffect(()=>{
      if(user?.role !== ROLE.ADMIN){
        navigate("/")
      }
    },[user])

  return (
    <div className=' min-h-[calc(100vh-120px)]  md:flex hidden'>
        <aside className='min-h-full w-full bg-green-400 max-w-80 customShadow'>
            <div className='h-37  bg-red-400 flex flex-col justify-center items-center pt-2'>
            <div className="text-5xl cursor-pointer flex relative justify-center">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="h-20 w-20 rounded-full "
                  alt={user?.name}
                />
              ) : (
                <FaRegUserCircle />
              )}
            </div>
            <p className='capitalize text-lg font-semibold'>{user?.name}</p>
            <p className='text-sm'>{user?.role}</p>
            </div>
            <div>
              <nav className='grid bg-white  p-4'>
                <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-200'>All Users</Link>
                <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-200'>All Product</Link>
                <Link to={"all-orders"} className='px-2 py-1 hover:bg-slate-200'>All Order</Link>
              </nav>
            </div>
        </aside>
        <main className='w-full h-full p-2'>

        <Outlet/>
        </main>
    </div>
  )
}

export default AdminPannel