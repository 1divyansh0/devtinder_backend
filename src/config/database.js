require("dotenv").config(); // Load from .env
const mongoose = require("mongoose");

const connect = async () => {
   await mongoose.connect(process.env.VITE_MONGODB_URI);
};

module.exports = connect;
