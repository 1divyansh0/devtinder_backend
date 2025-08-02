const express = require("express");
const authrouters = express.Router();
const {validate} = require("../../utils/validations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {auth} = require("../../middleware/auth");
const user = require("../Models/user");
const cookie = require("cookie-parser");


authrouters.post("/login" , async(req,res)=>{
  
  try{
    const {email,password} = req.body;
     const data = await user.findOne({email:email});
     if(!data)throw new Error("Not Available data!");
    
    const login = await bcrypt.compare(password,data.password);
    const token = jwt.sign({_id: data._id},"devtinder@12")

    if(login){
      res.cookie("token",token, {
    httpOnly: true,
    secure: true,          // ← change this
    sameSite: "None"       
    });
      res.send(data);
    }
    else{
      throw new Error("Wrong Password!")
    }
   }
   catch(err){
     res.status(400).send("something Wrong!"+err.message)
   }

})
//api call my first  for signup
authrouters.post("/signup",async(req,res)=>{
  const {firstname,lastname,email,password,gender} = req.body;

  
  
  
  try{
    validate(req)
        const existingdata = await user.findOne({
     email
    })

    if(existingdata){
     
      throw new Error("User already Added!");
    }
     
    const hashpassword =  await bcrypt.hash(password,10);
     
    const dummy = new user({
      firstname,
      lastname,
      email,
      password:hashpassword,
      gender
    })
    const saveddata = await dummy.save();
    const token = jwt.sign({_id: saveddata._id},"devtinder@12")
    
    res.cookie("token",token,{
  httpOnly: true,
  secure: true,
  sameSite: "None"

    }
      )

    res.send(saveddata)
  }
  catch(err){
   res.status(404).send(err.message);
  }
})

authrouters.post("/logout",(req,res)=>{
  res.cookie("token",null,{
  httpOnly: true,
  secure: true,
  sameSite: "None",
    expires: new Date(Date.now())
  })
  res.send("User Logout!")

})

module.exports = authrouters;
