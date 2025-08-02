const mongoose = require("mongoose");
const validator = require("validator");
 const userschema = mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid!"+value)
            }
        }
    }
    ,
    password:{
        type: String,
        required: true
    },
    gender:{
        type:String,
        required: true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Invalid Gender");
                
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
    skills:{
        type:[String]
    },
    dp:{
     type:String,
     default: "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517430_1280.png"
    },
    About:{
        type:String,
        default: "Hy i am a Passionate Coder!"
    }

}, {
        timestamps:true
    })

module.exports = mongoose.model("user",userschema)