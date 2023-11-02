const express = require('express');
const app= express();
const User = require('./models/user');
const mongoose = require('mongoose');
const bcrypt= require('bcrypt'); // to hash user password , for security 
const session = require('express-session');



main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Auth-Demo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000 // Set a longer timeout value
    })
    console.log("connected ")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.set('view engine','ejs');
app.set('views','views');

app.use(express.urlencoded({extended:true}));
app.use(session({
      secret: 'notagoodsecret',
       resave: false, // Whether to save the session data even if it's not modified
       saveUninitialized: false // Whether to save uninitialized sessions (e.g., empty sessions)
}))

const requireLogin=(req,res,next)=>{
    if(!req.session.user_id){
        return res.redirect('/login'); // if user not logged in , redirected to login
    }
    next(); // else access to other routes
}

app.get('/',(req,res)=>{
    res.send('This is the home page');
  })
  
// SETTING UP A PASSWORD SIGNUP PAGE
app.get('/register',(req,res)=>{
    res.render('register');
  })
  
//SETTING UP PASSWORD USING HASH BCTYPT
app.post('/register' , async(req,res)=>{
   const { password,username }=req.body;
   const user = new User({username,password});
    await user.save();
    req.session.user_id =user._id;
    res.redirect('/')
})

// PAGE FOR LOGIN
app.get('/login',(req,res)=>{
    res.render('login');
  })
// VERIFYING PASSWORD HERE
app.post('/login', async(req,res)=>{
   const {username,password}= req.body;
   const foundUser = await User.findAndValidate(username,password);
   if(foundUser){
     req.session.user_id = foundUser._id;
   res.redirect('/secret');
  }else{
    res.redirect('/login');
  }
})

// logging out 
app.post('/logout',(req,res)=>{
     req.session.user_id = null;
    //  req.session.destroy(); // this destroys the whole session and log you out , destroys all user information
     res.redirect('/login');
})
  
// app.get('/secret',(req,res)=>{
//     if(!req.session.user_id){  // using session to check if a user is currently login or not , 
//        return res.redirect('/login');// if not logged in
//     }
//     res.render('secret'); // when user logged in
// })
// 
//OTHER WAY BY USING MIDDLEWARE WE MADE requireLogin
app.get('/secret',requireLogin,(req,res)=>{
   res.render('secret'); // when user logged in
})

app.get('/topsecret',requireLogin,(req,res)=>{
    res.send('toop secreeeeeeet');
})

app.listen(80,()=>{
    console.log('serving your app');
})