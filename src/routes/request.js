const express = require("express");
const reqrouters = express.Router();
const {validate} = require("../../utils/validations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {auth} = require("../../middleware/auth");
const user = require("../Models/user");
const cookie = require("cookie-parser");
const connectionrequest = require("../Models/connectionrequest");

reqrouters.post("/request/send/:status/:userid" ,auth, async (req,res)=>{
    try{
        const loggedindata = req.user;
         
        const fromuserid = loggedindata._id;

        const touserid = req.params.userid.trim();
        const status = req.params.status;

        const userexisted = await connectionrequest.findOne({
            $or:[
                {fromuserid,touserid},
                {fromuserid:touserid,touserid:fromuserid}
            ]
        }
        )

        if(userexisted){
          return res.status(404).send("User Already Existed!")
        }

        const connection = new connectionrequest({
            fromuserid,
            touserid,
            status
        })

        const data = await connection.save();

        res.json({
            message: "connection send successfully!",
            data
        })
              
        
    }
    catch(err){
        throw new Error("Error:"+err);
    }
    

})

module.exports = reqrouters