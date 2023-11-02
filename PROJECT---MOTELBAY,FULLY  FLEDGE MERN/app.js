if(process.env.NODE_ENV !== "production"){ //This line of code checks if the NODE_ENV environment variable is not set to "production". If it's not in production mode, the code loads and configures the .env file using the dotenv package.
    require('dotenv').config();   //require('dotenv').config(): The dotenv package allows you to load environment variables from a .env file into process.env. This is useful for keeping sensitive information (like API keys, database credentials, etc.) separate from your codebase. The config() method loads the variables defined in the .env file into the current environment.
}

const express = require('express');
const port=80;
const path=require('path');
const mongoose= require('mongoose');
const ejsMate = require('ejs-mate'); //required for using boilerplate code;
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError =require('./utils/ExpressError');
const methodOverride = require('method-override');//required for overriding method requests
const passport =require('passport');  
const LocalStrategy= require('passport-local');
const User = require('./models/user');
const helmet = require('helmet');

const mongoSanitize = require('express-mongo-sanitize');

const userRoutes = require('./routes/users')
const motelsRoutes= require('./routes/motels');
const reviewsRoutes = require('./routes/reviews')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/motel-bay', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000 // Set a longer timeout value
    })
    console.log("connected ")
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const app=express();
app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({extended:true}))//used for parsing
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));
app.use(mongoSanitize());

const sessionConfig ={
    name:'session', // give any random name to avoid default name which is easy to track 
   secret:'thisisasecret',
    resave:false,
    saveUninitialized:true,
     cookie:{
        httpOnly:true,
        // secure:true, // uncomment this while deploying
        expires:Date.now()+1000*60*60*24*7,
        maxAge:1000*60*60*24*7
   }
}
app.use(session(sessionConfig));
app.use(flash());
// app.use(helmet());
// //helmet will not allow scripts/url/images to permit to run that are in the
// //arrays below.

// const scriptSrcUrls = [
//     "https://stackpath.bootstrapcdn.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://api.mapbox.com/",
//     "https://kit.fontawesome.com/",
//     "https://cdnjs.cloudflare.com/",
//     "https://cdn.jsdelivr.net",
// ];
// const styleSrcUrls = [
//     "https://kit-free.fontawesome.com/",
//     "https://stackpath.bootstrapcdn.com/",
//     "https://api.mapbox.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://fonts.googleapis.com/",
//     "https://use.fontawesome.com/",
// ];
// const connectSrcUrls = [
//     "https://api.mapbox.com/",
//     "https://a.tiles.mapbox.com/",
//     "https://b.tiles.mapbox.com/",
//     "https://events.mapbox.com/",
// ];
// const fontSrcUrls = [];
// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: [],
//             connectSrc: ["'self'", ...connectSrcUrls],
//             scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
//             styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//             workerSrc: ["'self'", "blob:"],
//             objectSrc: [],
//             imgSrc: [
//                 "'self'",
//                 "blob:",
//                 "data:",
//                 "https://res.cloudinary.com/douqbebwk/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
//                 "https://images.unsplash.com/",
//             ],
//             fontSrc: ["'self'", ...fontSrcUrls],
//         },
//     })
// );




//Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());
//// Configure Passport to use LocalStrategy for authentication
passport.use(new LocalStrategy(User.authenticate()));
// Serialize and deserialize user data for session management
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// setting flash middleware
app.use((req,res,next)=>{
    res.locals.currentUser = req.user; // this way, you have access to currentUser in all of the templates
    res.locals.success =req.flash('success');
    res.locals.error=req.flash('error');
    next();
})

app.get('/fakeUser', async(req,res)=>{
    const user = new User({email:'alpah@gmail.com',username:'alpha'})
    const newUser= await User.register(user,'chicken')
    res.send(newUser);
})

// using routes middleware
app.use('/',userRoutes);
app.use('/motels',motelsRoutes);
app.use('/motels/:id/reviews',reviewsRoutes);

app.get('/',(req,res)=>{
    res.render('home');
});



//app.all('*', ...): This line sets up a middleware that matches any HTTP method (GET, POST, PUT, etc.) and any route. The * wildcard means it will match any route.
app.all('*',(req,res,next)=>{
     // This middleware will match any route ('*')
    next(new ExpressError('Page Not Found',404));
    // Create a new error using a custom error class 'ExpressError'
  // 'Page Not Found' is the error message, and 404 is the status code
 
})

app.use((err,req,res,next)=>{
    const{statusCode=500}=err;
    if(!err.message)err.message='Something went wrong!';
    res.status(statusCode).render('error',{err});

})

app.listen(port,()=>{
    console.log(`serving on port ${port}`)
})