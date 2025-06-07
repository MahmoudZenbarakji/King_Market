const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const connectDB = require('./database/connectdb');
const User = require('./model/User'); // adjust the path if needed

const seedAdmin = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin already exists');
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash('admin@kingmarket', 10); // sample password

    const newAdmin = new User({
      username: 'admin',
      email: 'admin@kingmarket.com',
      passwordHash: hashedPassword,
      role: 'admin',
    });

    await newAdmin.save();
    console.log('Admin user created');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
