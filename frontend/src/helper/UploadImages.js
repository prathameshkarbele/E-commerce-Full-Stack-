const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload` 


const UploadImages = async (image) => {
    const formData = new FormData()
    formData.append("file",image)
    formData.append("upload_preset","mern_Product")
    formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);

    console.log(formData, "formData")
const dataResponce = await fetch(url, {
    method: "post",
    body: formData
})
// console.log(dataResponce.json(), "dataResponce.json() ppp")
  // Check for errors in the response
  if (!dataResponce.ok) {
    const errorData = await dataResponce.json();
    throw new Error(`Error: ${errorData.error.message}`);
  }

  return dataResponce.json();


}
export default UploadImages