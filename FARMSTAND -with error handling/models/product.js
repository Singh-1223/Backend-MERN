const mongoose =require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name cannot be blank']
    },
    price:{
        type:Number,
        required:true,
        min:[0,"should be greater than 0"] // can pass a error message with validator;

    },
    category:{
        type:String,
        lowercase:true,
        enum:['fruit','vegetable','dairy']
    }
})

const Product=mongoose.model('Product',productSchema);

module.exports =Product;