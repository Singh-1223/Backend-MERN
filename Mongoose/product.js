const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
  console.log('connected');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//creating a Schema
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        min:0
    },
    onSale:{
        type:Boolean
    },
    category:[String]  // passing a array of strings as category
});

// creating a model
const Product= mongoose.model('Product',productSchema);

//creating a product
const bike= new Product({name:'splender', price:479,onSale:false,category:['chk','sports']})

bike.save()
// .then(data=>{
//     console.log("chl pya");
//     console.log(data);
// }).catch(err=>{
//     console.log("oh error");
//     console.log(err)
// })

// Product.findByIdAndUpdate({price:479},{price:199},{new:true,runValidators:true})
// .then(data=>{
//     console.log("chl pya");
//     console.log(data);
// }).catch(err=>{
//     console.log("oh error");
//     console.log(err)
// })

// productSchema.methods.toggleOnSale=function(){
//     this.onSale=!this.onSale;
//     return this.save();  //save and return this instance
// }

// productSchema.methods.addCategory=function(newcate){
//     this.category.push(newcate);
//     return this.save();
// }

// const Product =mongoose.model('Product',productSchema);

// const findProduct= async()=>{
//      const foundProduct= await Product.findOne({name:'splender'});
//      console.log(foundProduct);
//      await foundProduct.toggleOnSale();
//      console.log(foundProduct);
//      await foundProduct.addCategory('good')
//      console.log(foundProduct);
// }