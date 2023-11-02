// using this js file for just development purpose, to check at differenrt instances if model working or not

const mongoose=require('mongoose');
const Product =require('./models/product')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
       console.log("connected with mongo");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const p= new Product({
    name:'grape',
    price:1.3,
    category:'fruit'
})

p.save()
  .then(val=>{
    console.log(val);
  })
  .catch(err=>{
    console.log("oh error");
    console.log(err);
  })