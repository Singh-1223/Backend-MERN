const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
 await mongoose.connect('mongodb://localhost:27017/relationshipDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000 // Set a longer timeout value
});
 console.log('conncected');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
