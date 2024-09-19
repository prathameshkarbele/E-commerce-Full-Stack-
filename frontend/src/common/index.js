const backendDomain = process.env.REACT_APP_BACKEND_URI

const SummaryApi = {
   singUp: {
    url:   `${backendDomain}/api/signup`,
    method:"post"
   },
   singin: {
    url:   `${backendDomain}/api/signin`,
    method:"post"
   },
   current_user: {
      url:`${backendDomain}/api/user-details`,
      method:"get"
   },
   Logout_user:{
    url: `${backendDomain}/api/userLogout`,
    method:'get'
   }
   ,
  allUser:{
    url: `${backendDomain}/api/all-user`,
    method:'get'
   },
  Updateuser:{
    url: `${backendDomain}/api/update-user`,
    method:'post'
   },
   UploadProduct:{
      url: `${backendDomain}/api/upload-product`,
      method:'post'
   },
   allProduct:{
      url: `${backendDomain}/api/get-product`,
      method:'get'
   },
   UpdateProduct:{
      url: `${backendDomain}/api/update-product`,
      method:'post'
   },
   ProductCategory:{
      url: `${backendDomain}/api/get-productCategory`,
      method:'get'
   },
   CategoryWiseProducr:{
      url: `${backendDomain}/api/category-product`,
      method:'post'
   },
   ProductDetails:{
      url: `${backendDomain}/api/product-Details`,
      method:'post'
   },
   AddToCartProduct:{
      url: `${backendDomain}/api/addtoCart`,
      method:'post'
   },
   countAddToCartProduct:{
      url: `${backendDomain}/api/countAddToCartProduct`,
      method:'get'
   },
   AddToCartProductView:{
      url: `${backendDomain}/api/view-card-product`,
      method:'get'
   },
   UpdateCartProduct:{
      url: `${backendDomain}/api/update-card-product`,
      method:'post'
   },
   DeleteCartProduct:{
      url: `${backendDomain}/api/Delete-card-product`,
      method:'post'
   },
   SearchProduct:{
      url: `${backendDomain}/api/Serch`,
      method:'get'
   },
   FilterProdcuts:{
      url: `${backendDomain}/api/filter-product`,
      method:'post'
   },
   Payment:{
      url: `${backendDomain}/api/checkout`,
      method:'post'
   },
   OrderList:{
      url: `${backendDomain}/api/order-list`,
      method:'get'
   },
}
export default SummaryApi