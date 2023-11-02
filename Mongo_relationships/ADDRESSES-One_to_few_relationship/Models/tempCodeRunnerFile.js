const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/relationshipDB');
  console.log('conncected');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
    first:String,
    last:String,
    addresses: [
       {
        street:String,
        city:String,
        state:String,
        country:String
       }
    ]
})

const User =mongoose.model('User',userSchema);

const makeUser =async()=>{
    const u= new User({
        first:'hary',
        last:'poret'
    })
    u.addresses.push({
        street:'123 stre',
        city:'piliti',
        state:'up',
        country:'bhr'
    })
    
    const res=await u.save();
    console.log(res);
}

makeUser();