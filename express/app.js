const express = require("express") //impoet expess module
const path = require("path")
const app = express();//creating express app
const port =80;  

//EXPRESS SPEICFIC STUFF
app.use('/static',express.static('static')); // also make a folder with name static

// PUG SPECIFIC STUFF
app.set('view enegine','pug')//set teh template engine as pug
app.set('views',path.join(__dirname,'views'))//set the views directory

// ENDPOINTS
app.get('/',(req,res)=>{
    const con = "this is the best content"; // content 
    const params = {'title':' pug is best','content':con}
    res.status(200).render('index.pug',params)
})

// START THE SERVER 
app.listen(port,()=>{
    console.log(`app started successfully at port ${port}`)
})