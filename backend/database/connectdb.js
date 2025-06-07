const mongoose = require('mongoose');
require('dotenv').config(); // Make sure this is here if you're using .env

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
   
  }
};

module.exports = connectDB;
