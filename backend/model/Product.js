const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Please Provide Product name'],
            maxlength:50
        },
        description:{
            type: String,
            required:[true,'please add a description'],
            maxlength:100,
        },
        
        price:{
            type:Number,
        },
        image:{
          type:String  
        },
        weight:{
            type:Number,
        },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
    
    },
     { timestamps: true }
);
module.exports = mongoose.model('Product',ProductSchema)