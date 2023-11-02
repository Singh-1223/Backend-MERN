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

const userSchema = new Schema({
    username:String,
    age:Number
})

 const tweetSchema = new Schema({
    text:String,
    likes:Number,
    user: { type: Schema.Types.ObjectId, ref:'User'}
 })

const User = mongoose.model('User',userSchema);
const Tweet = mongoose.model('Tweet',tweetSchema);

// const makeTweets = async ()=>{
//      const user = new User({username:'chickenfan99',age:61})
      
//     const tweet1= new Tweet({text:'omg i have tweeted',likes:45})
//      tweet1.user = user;
//      user.save();
//      tweet1.save();
// }

// const makeTweets = async ()=>{
//      const user = await User.findOne({username:'chickenfan99'})
      
//     const tweet2= new Tweet({text:'omg i have tweeted the second tweet',likes:10})
//      tweet2.user = user;
    
//      tweet2.save();
// }

// makeTweets();
const findTweet = async()=>{
    // const t = await Tweet.findOne({}).populate('user','username');
    const t= await Tweet.find({}).populate('user');
    console.log(t);
}

findTweet();
