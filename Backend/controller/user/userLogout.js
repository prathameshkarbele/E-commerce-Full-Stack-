async function userLogout(req,res){
  try {
    const tokenOption = {
      httpOnly: true,
      secure:true,
      sameSite:'None'
  }
    res.clearCookie("token",tokenOption)
     res.json({
        message: "Logged Out Succesfully",
        error:false,
        success: true,
        data:[]
     })

  } catch (error) {
    res.json({
        message: error.message || error,
        error:true,
        success:false,
    })
  }
}
module.exports = userLogout;