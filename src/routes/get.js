const express = require("express");
const getrouter = express.Router();
const {auth} = require("../../middleware/auth");


getrouter.get("/profile",auth,async(req,res)=>{

  try{
    const loggedindata = req.user;

    if(!loggedindata)throw new Error("Please loggin!");
    res.json({
        message: " Here is your profile",
        loggedindata
    })
    
  }
  catch(err){
    res.status(404).send("Error:"+err.message);
  }

    

})

module.exports = getrouter;

