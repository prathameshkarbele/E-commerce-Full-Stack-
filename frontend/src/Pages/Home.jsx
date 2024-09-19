import React from 'react'
import CategoryList from '../Componant/CategoryList'
import BannerProduct from '../Componant/BannerProduct'
import HorizontalCardProduct from '../Componant/HorizontalCardProduct'
import VerticalCardProduct from '../Componant/VerticalCartProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
      <HorizontalCardProduct category={"wacthes"} heading={"Popular's Watches"} />
      <VerticalCardProduct category={"mobiles"} heading={"Tops Selling Mobiles"}/>
      <VerticalCardProduct category={"mouse"} heading={"Tops Selling mouse"}/>
      <VerticalCardProduct category={"televisions"} heading={"Tops Selling televisions"}/>
      <VerticalCardProduct category={"earphones"} heading={"Tops Selling earphones"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Tops Selling refrigerator"}/>
      <VerticalCardProduct category={"camera"} heading={"Tops Selling camera"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Tops Selling trimmers"}/>
      <VerticalCardProduct category={"speakers"} heading={"Tops Selling speakers"}/>
      {/* <VerticalCardProduct category={"processor"} heading={"Tops Selling processor"}/>
      <VerticalCardProduct category={"printers"} heading={"Tops Selling printers"}/> */}
    </div>
  )
}

export default Home