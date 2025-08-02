const express = require("express");
const  reqrecive = express.Router();
const {auth} = require("../../middleware/auth");
const connectionrequest = require("../Models/connectionrequest");


reqrecive.get("/request/pending",auth,async(req,res)=>{
    try{
    const loginuserdata = req.user;

    const fromuserid = loginuserdata._id;

    const data =  await connectionrequest.find({
       touserid: fromuserid,
       status : "interested"
    }).populate("fromuserid",["firstname","lastname","dp","gender","About","skills"])

    if(!data)throw new Error("Nothing to show!");
    res.json({
        message:"Here are the requests you got!",
        data
    })

    }catch(err){
        res.status(404).send("Error:"+err);

    }


})

module.exports = reqrecive;
