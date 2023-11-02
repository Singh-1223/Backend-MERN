// Import the 'express' module and create an instance of the Express application
const express = require('express');
const app = express();

// Import and configure the 'express-session' middleware
const session = require('express-session');
const sessionOptions = {
  secret: 'thisisnotagoodsecret', // Secret key for session encryption (should be a strong secret)
  resave: false, // Whether to save the session data even if it's not modified
  saveUninitialized: false // Whether to save uninitialized sessions (e.g., empty sessions)
};
app.use(session(sessionOptions)); // Use the 'express-session' middleware

// Route to track and display the number of times the page is viewed
app.get('/viewcount', (req, res) => {
  // Check if 'count' exists in the session; if not, initialize it to 1
  if (req.session.count) {
    req.session.count += 1; // Increment the count if it exists
  } else {
    req.session.count = 1; // Initialize the count to 1 if it doesn't exist
  }
  // Send a response with the number of times the page has been viewed
  res.send(`You viewed this page ${req.session.count} times`);
});

// Route to set the username in the session and redirect to the greeting page
app.get('/register', (req, res) => {
  const { username = 'Anonymous' } = req.query; // Get the username from the query parameter
  req.session.username = username; // Set the username in the session
  res.redirect('/greet'); // Redirect to the greeting page
});

// Route to display a personalized greeting using the username from the session
app.get('/greet', (req, res) => {
  const { username } = req.session; // Get the username from the session
  res.send(`Welcome back, ${username}`); // Send a greeting with the username
});

// Start the Express application and listen on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
