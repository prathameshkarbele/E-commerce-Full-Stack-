import React, { useEffect, useState } from 'react'
import UploadProducts from '../Componant/UploadProducts'
import SummaryApi from '../common'
import AdminProductCard from '../Componant/AdminProductCard'

const AllProduct = () => {
  const [openUploadProducts, setopenUploadProducts] = useState(false)
  const [allProduct , setAllProduct] = useState([])

  const fetchAllProduct = async() =>{
    const responce = await fetch(SummaryApi.allProduct.url)
    const dataResponce = await responce.json()

    setAllProduct(dataResponce?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])

  // console.log(allProduct, "allProduct ddd")
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className=' border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-1 px-3  rounded-full transition-all' onClick={() => setopenUploadProducts(true)}>Upload Products</button>
      </div>

  {/* allProduct */}
<div className='flex flex-wrap  gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll '>
{
  allProduct?.map((product, index)=>{
    return(
      <div>
        <AdminProductCard product ={product} fetchData={fetchAllProduct}/>
      </div>
    )
  })
}

</div>


      {openUploadProducts && (
        <UploadProducts onclose = {()=> setopenUploadProducts(false) } fetchData={fetchAllProduct}  />
      )}
     
    </div>
  )
}

export default AllProduct