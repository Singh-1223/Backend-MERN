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
    },
    farm:{ // making relation wiht farm
        type: mongoose.Schema.Types.ObjectId,
        ref:'Farm'
    }
})

const Product=mongoose.model('Product',productSchema);

module.exports =Product;