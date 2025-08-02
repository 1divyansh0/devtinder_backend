const express = require("express");
const profilerouter = express.Router();
const {validate,validateupdate} = require("../../utils/validations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {auth} = require("../../middleware/auth");
const cookies = require("cookie-parser");
const user = require("../Models/user");




//get profiles
profilerouter.patch("/update",auth, async(req,res)=>{
  try{
    validateupdate(req);
    const loggedinuser = req.user;
    Object.keys(req.body).forEach((k)=>(loggedinuser[k]=req.body[k]));


    await loggedinuser.save();
    res.send(loggedinuser)


  }
  catch(err){
    res.status(404).send("Cant do this!"+err.message)
  }

})

module.exports = profilerouter;