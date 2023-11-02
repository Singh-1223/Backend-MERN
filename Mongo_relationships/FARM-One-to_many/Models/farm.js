// explains one to many relationships

const mongoose = require('mongoose');
const {Schema} = mongoose; // same as const Schema = mongoose.Schema
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationshipDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000 // Set a longer timeout value
    })
    
  console.log('conncected');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const productSchema = new Schema({
    name:String,
    price:String,
    season: {
        type:String,
        enum:['Spring','Summer','Fall','Winter']
    }
})

const farmSchema = new Schema({
    name:String,
    city:String,
    products:[{type: Schema.Types.ObjectId, ref:'Product'}] // mongoose.Schema.Types.ObjectId to give objectId
       // ref:'Product' // we are referecncing Product model
 })

const Product = mongoose.model('Product',productSchema);
const Farm = mongoose.model('Farm',farmSchema);

// Product.insertMany([
//     {name: 'melon',price:344,season:'Summer'},
//     {name: 'duja melon',price:444,season:'Winter'},
//     {name: 'theja melon',price:554,season:'Spring'}
// ])

// const makeFarm = async()=>{
//     const farm = new Farm({name:'chlo melon', city:'pind'});
//     const melon= await Product.findOne({ name:'duja melon' });
//     farm.products.push(melon);
//     await farm.save();
//     console.log(farm);
// }

// makeFarm();

const addProduct = async()=>{
    const farm = await Farm.findOne({name:'duja melon'});
    const watermelon = await Product.findOne({name:'melon'});
    farm.products.push(watermelon);
    await farm.save();
    console.log(farm);
}

// addProduct();

Farm.findOne({name:'chlo melon'})
   .populate('products') //populate with reference to products to see full object rather than just object ID
   .then(farm=>console.log(farm));