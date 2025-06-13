const mongoose = require('mongoose')

const AboutusSchema = new mongoose.Schema
(
    {
        title:{
            type:String,
            max:30,
            require:[true,"please provide a title for the description"]
        },
        text:{
            type:String,
            
        }
    }
)