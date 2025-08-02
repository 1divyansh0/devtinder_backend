const express = require("express");
const feedrouter = express.Router();
const {auth} = require("../../middleware/auth");
const connectionrequest = require("../Models/connectionrequest")
const user = require("../Models/user")

feedrouter.get("/feed",auth, async (req, res)=>{
    const loggedindata = req.user;




    const userdata =  await connectionrequest.find({
        $or:[
            {fromuserid: loggedindata._id},
            {
                touserid: loggedindata._id
            }
        ]
    })

    const  hideuser = new Set();
    userdata.forEach((data)=>{
        hideuser.add(data.fromuserid.toString());
        hideuser.add(data.touserid.toString());

    })

    const feeddata =  await user.find({
        $and:[
            {_id: {$nin : Array.from(hideuser)}},
            {_id: {$ne: loggedindata._id}}
        ]
    }).select("firstname lastname dp gender About skills age _id")

    res.json({
        message: "feed is here!",
        feeddata
    })
})

module.exports = feedrouter