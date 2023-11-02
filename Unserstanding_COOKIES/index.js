const express = require('express'); // Import the Express.js framework.
const app = express(); // Create an instance of the Express application.

const cookieParser = require('cookie-parser'); // Import the 'cookie-parser' middleware.
app.use(cookieParser('thisismysecret')); // Use the 'cookie-parser' middleware with a secret key for signed cookies.
// use this string to sign the cookie

app.get('/greet', (req, res) => { // Define a route for the '/greet' endpoint.
    const { name = 'no-name' } = req.cookies; // Retrieve the 'name' cookie from the request.
    res.send(`Hey there ${name}`); // Send a response containing a greeting with the name from the cookie.
});

app.get('/setname', (req, res) => { // Define a route for the '/setname' endpoint.
    res.cookie('name', 'stevie chikie'); // Set a cookie named 'name' with the value 'stevie chikie'.
    res.cookie('animal', 'doggy'); // Set a cookie named 'animal' with the value 'doggy'.
    res.send('Sent you a cookie'); // Send a response indicating that a cookie has been sent.
});

//signiing cookies
app.get('/getsignedcookie', (req, res) => { // Define a route for the '/getsignedcookie' endpoint.
    res.cookie('fruti', 'grape', { signed: true }); // Set a signed cookie named 'fruti' with the value 'grape'.
    res.send('Ok signed your first cookie'); // Send a response indicating that a signed cookie has been set.
});

app.listen(3000, () => { // Start the Express app on port 3000.
    console.log('Listening on port 3000');
});
