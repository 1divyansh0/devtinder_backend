const express = require("express");
const app = express();
const connect = require("./src/config/database");
const bcrypt = require("bcrypt");
const {validate} = require("./utils/validations")
const jwt = require("jsonwebtoken");
const {auth} = require("./middleware/auth");
const user = require("./src/Models/user");
const cookies = require("cookie-parser");
const { isAbaRouting } = require("validator");
const authrouters = require("./src/routes/auth2");
const profilerouter = require("./src/routes/profile")
const reqrouters = require("./src/routes/request")
const reviewrequest = require("./src/routes/review");
const reqrecive = require("./src/routes/reqrecieved");
const getrouter = require("./src/routes/get");
const feedrouter = require("./src/routes/feed");
const cors = require("cors");
const refresh = require("./src/routes/refresh");
const connectrouter = require("./src/routes/connections");
const PORT = process.env.PORT;
const http = require("http");
const initialisesocket = require("./utils/initialisesocket");
app.use(cors({
   origin: "https://devtinder-frontend-f.onrender.com",
   credentials:true
}))
app.use(express.json());
app.use(cookies());

const server = http.createServer(app);
initialisesocket(server);



app.use("/",authrouters);
app.use("/",profilerouter);
app.use("/",reqrouters);
app.use("/",reviewrequest)
app.use("/",reqrecive);
app.use("/",getrouter);
app.use("/",feedrouter)
app.use("/",refresh)
app.use("/",connectrouter)


connect().then(()=>{
  console.log("Database Connection Established!");
  server.listen(PORT,()=>{
    console.log("hy! server is created!")
})
}).then((err)=>{
  console.log(err);
})

