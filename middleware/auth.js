const jwt = require("jsonwebtoken") ;
const user = require("../src/Models/user");

 const auth = async (req,res,next)=>{
  try{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).send("token expires!")
    }

  const decodeddata = jwt.verify(token,"devtinder@12");

  const {_id} = decodeddata;
  const userdata =  await user.findById(_id);

  if(!userdata){
    throw new Error("No user data found!");
  }
  req.user = userdata;
  next();
  }
  catch(err){
    res.status(404).send("Error:" +err);
  }

 }

 module.exports = {
    auth
 }