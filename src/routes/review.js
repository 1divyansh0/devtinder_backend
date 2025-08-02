const express = require("express");
const reviewrouters = express.Router();
const {validate} = require("../../utils/validations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {auth} = require("../../middleware/auth");
const user = require("../Models/user");
const cookie = require("cookie-parser");
const connectionrequest = require("../Models/connectionrequest");

 reviewrouters.post("/review/:status/:fromuserid" , auth, async(req,res)=>{
    try{    
    const loggedinuser = req.user;

    const allowed = ["rejected","accepted"];

    const status = req.params.status;
    
    const fromuserid = req.params.fromuserid.trim();
    const _id = loggedinuser._id;


    
    const present =  await connectionrequest.findOne({
         fromuserid: fromuserid,
         touserid: _id

    })

    

    if(!present)throw new Error("No Connection Requests!")

    if(!allowed.includes(status)){
        res.status(404).send("Invailid Entry!");
    }




    const accepted =  await connectionrequest.findOne({
       fromuserid : fromuserid ,
       touserid: _id,
       status: "interested"

    })

    if(!accepted){
       return res.status(404).send("Action is not allowed!");
    }
     present.status = status;
     await present.save();

    res.send("Action perform Successfully!")

    }catch(err){
        res.status(404).send("Error :"+err.message);
        
    }


})

module.exports = reviewrouters