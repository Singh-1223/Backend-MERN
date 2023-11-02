const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/movieApp');
   console.log("connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
 // just creating a schema 
const movieSchema=new mongoose.Schema({
  title:String,
  year:Number,
  score:Number
});

//  creating instance of the schema
const Movie=mongoose.model('Movie',movieSchema);

// Movie.insertMany([
//   {title:'ams',year:77,rating:237},
//   {title:'as',year:77,rating:237},
//   {title:'ms',year:77,rating:237},
//   {title:'amsd',year:77,rating:237},
// ])
// .then(data=>{
//   console.log("chl pya");
//   console.log(data);
// })

// Movie.find({title:'as'}).then(data=>console.log(data));

// Model.findById()   very useful 

// Movie.findOneAndUpdate({title:'as'},{$set:{title:'adddy'}}).then(data=>console.log(data));
// Movie.deleteOne({title:'ams'}).then(data=>console.log(data));
Movie.find({}).then(data=>console.log(data));