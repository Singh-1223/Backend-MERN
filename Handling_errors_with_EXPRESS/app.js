const express =require('express');
const port =3000;
const app =express();
const path =require("path");
const morgan= require('morgan');  // a middleware
const AppError= require('./AppError');

app.get('/',(req,res)=>{
    res.send("hi");
})


// writing own middleware
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
    // res.send("sorry you need a passwoed")
    throw new Error('Password required');  //can explicity handle error
  })

  //******* USING OWN ERROR CLASS */
  // for protecting spsecific routes, not use this funtion in that route
const verifyPassword= (req,res,next)=>{
    const {password}= req.query;
    if(password==='openit'){
            next();
    }
    // res.status(401); //setting a status code, 401 is for unauthorised person
    // res.send("sorry you need a passwoed")
    throw new AppError('sorry you need a password',401);
  }

  app.get('/dog',(req,res)=>{
    console.log(`REQUEST DATE:${req.requestTime}`)
    res.send("woof");
})


app.get('/secret',verifyPassword,(req,res)=>{
    res.send('mera vadha sara secret');
})

app.get('/admin',(req,res)=>{
    throw new AppError('you are not an Admin', 403);
})

// if nothing matches , the sends this 
app.use((req,res)=>{
    res.status(404).send('Not Found');
})
//*****************ERROR HANDLING**************************** */
// app.use((err,req,res,next)=>{
//   console.log('*********ERROR*********');// prints in console
//    console.log(err);    
//   next(err); //pass along the err in next to trigger next error handling middleware,else just next() will go on to non-error handling middleware

// })

// app.use((err,req,res,next)=>{
//   console.log('*********ERROR*********');// prints in console
//   res.status(500).send("oh boy,we got an error");
// })

//other way to handle
app.use((err,req,res,next)=>{
    const {status=500,message='something went wrong'} =err;
     res.status(status).send(message);
})

app.listen(port,()=>{
    console.log(`listening in port${port}`);
});

