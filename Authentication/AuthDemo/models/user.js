const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema= mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username cannot be blank']
    },
    password:{
        type:String,
        required:[true,'Password cannot be blank']
   
    }
})



// Define a static method 'findAndValidate' on the userSchema
userSchema.statics.findAndValidate = async function(username, password) {
    // Find a user in the database by their username
    const foundUser = await this.findOne({ username });
 // Check if a user with the given username exists
    if (!foundUser) {
        return false; // User not found, return false
    }
 // Compare the provided password with the hashed password stored in the database
    const isValid = await bcrypt.compare(password, foundUser.password);
// If passwords match, return the found user; otherwise, return false
    return isValid ? foundUser : false;
}

// Set up Mongoose middleware before saving a user's data
userSchema.pre('save', async function(next) {
    // Check if the password field has been modified during the save operation
    if (!this.isModified('password')) {
        return next(); // If not modified, move to the next middleware or save step
    }
 // Hash the user's password using bcrypt with 12 rounds of salting
    this.password = await bcrypt.hash(this.password, 12);
// Move to the next middleware or save step
    next();
});

module.exports = mongoose.model('User',userSchema);