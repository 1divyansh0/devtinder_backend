const socket = require("socket.io");

const initialisesocket = (server)=>{
   const io = socket(server,{
      cors:{
        origin:"https://devtinder-frontend-f.onrender.com"
      }
   })

   io.on("connection",(socket)=>{
       //all events 
       socket.on("joinchat",({firstname,fromuserid,id})=>{
         const room = [fromuserid,id].sort().join("-");
         socket.join(room);

       }),
       socket.on("sendmessage",({firstname,fromuserid,id,text})=>{
        const room = [fromuserid,id].sort().join("-");
    
        io.to(room).emit("messagerecieved",{firstname,text})
       }),
       socket.on("disconnect",()=>{})
   })
};

module.exports = initialisesocket;
