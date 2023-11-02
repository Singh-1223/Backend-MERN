const mongoose = require('mongoose');

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

const userSchema = new mongoose.Schema({
    first:String,
    last:String,
    addresses: [
       {
        _id:{_id:false},
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
        first:'harrrry',
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

const addAddress = async(id)=>{
    const user = await User.findById(id);
    user.addresses.push({
        street:'bhari stre',
        city:'piliti',
        state:'up',
        country:'bhr'
    })
    const res= await user.save();
    console.log(res);
}

// addAddress('64dddc33d0a65898881f7fdc')
makeUser();