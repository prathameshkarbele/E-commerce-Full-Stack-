const userModel = require("../Model/userModel")
const { use } = require("../routes")

const uploadProductPermission = async(userId) =>{
  const user = await userModel.findById(userId)
  
  if(user.role !=='ADMIN'){
    return false
  }
  return false
}

module.exports = uploadProductPermission