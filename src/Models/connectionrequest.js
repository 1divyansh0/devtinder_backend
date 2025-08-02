const mongoose = require("mongoose");
const connectionrequestschema = mongoose.Schema({
      fromuserid:{
        type : mongoose.Schema.ObjectId,
        ref:"user",
        require: true
      },
      touserid:{
        type : mongoose.Schema.ObjectId,
        ref:"user",
        require: true
      },
      status:{
        type: String,
        require: true,
        enum:[
                "interested",
                "accepted",
                "rejected",
                "ignore"
            ]
        }
})

module.exports = mongoose.model("connectionrequest",connectionrequestschema)