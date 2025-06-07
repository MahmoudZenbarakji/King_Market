const express = require('express');
const connectdb = require('./database/connectdb');
const app = express()
const productRoute = require('./routes/productRoute')
const categoryRoute = require('./routes/categoryRoute')
const subcategoryRoute = require('./routes/subcategoryRoute')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const session = require('express-session');
const bodyParser = require('body-parser');
const isauth = require('./routes/authRoute')
const isAuthenticated = require('./middleware/session')
// At the top of your file
require('dotenv').config();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use('/api/product',productRoute)
app.use('/api/categories',categoryRoute)
app.use('/api/subcategory',subcategoryRoute)


app.get('/dashboard', isAuthenticated, (req, res) => {
  res.send('Welcome to the dashboard');
});



const PORT = process.env.PORT || 6000;
const startServer = async()=>{
    try{
        await connectdb(process.env.MONGO_URI)
        app.listen(PORT,()=>{
            console.log(`the Server is running in http://localhost:${PORT}`)
        })
    }catch(error){
        console.log(error)
    }
}
startServer()