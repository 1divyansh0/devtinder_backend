const express = require("express");
const { auth } = require("../../middleware/auth");
const connectrouter = express.Router();
const connectionrequest = require("../Models/connectionrequest")

connectrouter.get("/connections",auth,async(req,res)=>{
    try{
        const loggedinuser = req.user;
        const data = await connectionrequest.find({
            $or:[
                {fromuserid: loggedinuser?._id,
                 status:'accepted'
                },
                {
                 touserid: loggedinuser?._id,
                 status:'accepted'
                }
            ]
        }).populate("fromuserid",["_id", "firstname","lastname","dp","gender","About","skills"]).populate("touserid",["_id","firstname","lastname","dp","gender","About","skills"])
        
        const conn = data.map((row)=>{
            if (!row.fromuserid || !row.touserid)return null;
            if(row.fromuserid?._id.toString()===loggedinuser?._id.toString()){
                return row.touserid;
            }
            return row.fromuserid;
        })


        res.send(conn);

    }catch(err){
        res.status(404).send("Error"+err);

    }

})

module.exports = connectrouter