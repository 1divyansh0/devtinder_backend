const validator = require("validator")
const validate = (req)=>{
  const {firstname,lastname,email,password} = req.body;

  if(firstname.length<4 || firstname.length>50){
    throw new Error("Name length is not valid!")
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("Password is not strong!");
  }

}

const validateupdate = (req)=>{
  const allowed = ["firstname","lastname","email","dp","age","gender","skills","About"];
  const isallowed= Object.keys(req.body).every((k)=>allowed.includes(k));

  if(!isallowed)throw new Error("Update Not Allowed!");
  




}

module.exports = {
    validate,
    validateupdate
}