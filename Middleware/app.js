const express =require('express');
const port =3000;
const app =express();
const path =require("path");
const morgan= require('morgan');  // a middleware

app.get('/',(req,res)=>{
    res.send("hi");
})

// app.use(morgan('common')); // using morgan (a middleware)

//writing our first middleware;
// app.use((req,res,next)=>{
//     console.log("Thiis is my first middleware");
//     next(); // goes to next middleware or matching route
// })

// app.use((req,res,next)=>{
//     console.log("Thiis is my second middleware");
//     next(); 
//     console.log("thsi is second middleware after calling next")
// })

// app.use((req,res,next)=>{
//     console.log("Thiis is my third middleware");
//     return next(); 
//     console.log("third one after next"); // will not be called as next is returned 
// })

// app.use((req,res,next)=>{
//     // req.method='GET'; //explicity change the request method
//     console.log(req.method,req.path);
//     next();
// })

app.use((req,res,next)=>{
    req.requestTime=Date.now();
   console.log(req.method,req.path);
    next();
});

// using middleware on a particular path/route
app.use('/dog',(req,res,next)=>{  // only run when path/route '/dogs' is called
    console.log('i love dogs');
    next();
});

// password middleware demo (not real auth)
app.use((req,res,next)=>{
    const {password}= req.query;
    if(password==='openit'){
            next();
    }
    res.send("sorry you need a passwoed")
  })

  // for protecting spsecific routes, not use this funtion in that route
const verifyPassword= (req,res,next)=>{
    const {password}= req.query;
    if(password==='openit'){
            next();
    }
    res.send("sorry you need a passwoed")
  }

app.get('/dog',(req,res)=>{
    console.log(`REQUEST DATE:${req.requestTime}`)
    res.send("woof");
})

app.get('/secret',verifyPassword,(req,res)=>{
    res.send('mera vadha sara secret');
})

// if nothing matches , the sends this 
app.use((req,res)=>{
    res.status(404).send('Not Found');
})

app.listen(port,()=>{
    console.log("listening");
});

