//A library to help you hash passwords.
// read docs for more

const bcrypt = require('bcrypt');

// Function to hash a password using a generated salt
const hashPassword = async (pw) => {
    // Generate a salt with cost factor 12
    const salt = await bcrypt.genSalt(12);
    // Hash the password using the generated salt
    const hash = await bcrypt.hash(pw, salt);
    
    // Log the generated salt and hash
    console.log('Generated Salt:', salt);
    console.log('Hashed Password:', hash);
}

// Alternative technique to hash a password with a specified cost factor
const hashPasswordWithCostFactor = async (pw) => {
    // Hash the password with a cost factor of 12 directly
    const hash = await bcrypt.hash(pw, 12);
    
    // Log the hashed password
    console.log('Hashed Password:', hash);
}

// Function to compare a provided password with a hashed password
const login = async (pw, hashedPw) => {
    // Compare the provided password with the hashed password
    const result = await bcrypt.compare(pw, hashedPw);
    
    // Check the result of the comparison
    if (result) {
        console.log('LOG IN SUCCESSFUL!');
    } else {
        console.log('INCORRECT PASSWORD');
    }
}

// hashPassword('monkey');

//to login
// login('monkey','$2b$12$DmUTfHv.Ur5diOIxCH8auONF4/0xx7fvLnNpn8TuD3dXpGGgm8zde');


/*
Usage
     async (recommended)
const bcrypt = require('bcrypt');
const saltRounds = 10; // should be 12 by standard
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


To hash a password:

Technique 1 (generate a salt and hash on separate function calls):

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});

Technique 2 (auto-gen a salt and hash):

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});

Note that both techniques achieve the same end-result.



To check a password:
// Load hash from your password DB.
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
    // result == false
});
*/