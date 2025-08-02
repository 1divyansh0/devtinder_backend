const express = require("express");
const refresh = express.Router();;
const {auth} = require("../../middleware/auth")

refresh.get("/me",auth,async(req,res)=>{
    try {
    const currentUser = req.user
    res.send(currentUser);
  } catch (err) {
    res.status(500).send("Error"+err.message);
  }
})

module.exports = refresh;