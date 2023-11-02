const express= require('express');
const app=express();
const port=80;
const path =require('path');
const mongoose=require('mongoose');
const Product =require('./models/product')
const Farm= require('./models/farm')
const methodOverride = require('method-override')
const AppError = require('./AppError');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStand2');
       console.log("connected with mongo");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

//FARM ROUTES

app.get('/farms',async(req,res)=>{
    const farms= await Farm.find({});
    res.render('farms/index',{farms});
})

app.get('/farms/new',(req,res)=>{
    res.render('farms/new');
})

app.delete('/farms/:id',async(req,res)=>{
    const farm = await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms');
})

app.get('/farms/:id',async(req,res)=>{
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show',{farm});
})

app.post('/farms',async(req,res)=>{
     const farm = new Farm(req.body);
     await farm.save();
     res.redirect('/farms');
}) 

app.get('/farms/:id/products/new',async(req,res)=>{
    const {id} = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new',{categories,farm});
})

// setting relation b/w farms and products
app.post('/farms/:id/products',async(req,res)=>{
    const {id}= req.params;
    const farm = await Farm.findById(id);
    const {name,price,category}= req.body;
    const product = new Product({name,price,category});
    farm.products.push(product);
    product.farm =farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${id}`);
})


//PRODUCT ROUTES
const categories = ['fruit','vegetable','dairy'];

app.get('/products',async(req,res,next)=>{
    try{
    const {category}=req.query;
    if(category){
        const products = await Product.find({category});
        res.render('products/index',{ products,category });
    }else{
        const products = await Product.find({});
        res.render('products/index',{ products ,category:'All' });
    }
}catch(e){
    next(e);
}

})

app.get('/products/new',(req,res)=>{
   res.render('products/new',{categories});
})

// handling error in mongoose side , try and catch
app.post('/products', async(req,res,next)=>{
    try{
         const newProduct=new Product(req.body);
          await newProduct.save();
         res.redirect(`/products/${newProduct._id}`)
    }catch(e){
        next(e);
    }
})

//********HANDLING ERROR IN ASYNCRONOUS FUNCTIONS*************** */
// app.get('/products/:id',async(req,res,next)=>{
//     try{
//         const {id}=req.params;
//          const product = await Product.findById(id);
//         if(!product){
//             throw next( new AppError('product not found',404));
//         }// error is passed in next in async function.
//        res.render('products/show',{product});
//     } catch(e){
//        next(e);
//     }
// })

//********DEFING AN ASYNC UTILITY */
function wrapAsync(fn){
    return function(req,res,next){
        fn(req,res,next).catch(e=>next(e));
    }
}

//using wrapAsync ,our own defined function 
// can use wrapAsync and pass our function 
//this way we not have to write try and catch again and again for every funtion

app.get('/products/:id', wrapAsync(async(req,res,next)=>{
    
        const {id}=req.params;
         const product = await Product.findById(id).populate('farm','name');
         console.log(product);
        if(!product){
            throw next( new AppError('product not found',404));
        }// error is passed in next in async function.
       res.render('products/show',{product})
    }))

app.get('/products/:id/edit', async(req,res,next)=>{
   try{
       const {id}=req.params;
        const product = await Product.findById(id);
       if(!product){
          return  next( new AppError('product not found',404));
       }
        res.render('products/edit',{product,categories});
   }catch(e){
    next(e);
   }
})

app.put('/products/:id',async(req,res,next)=>{
    try{
         const {id} =req.params;
        const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true});
        res.redirect(`/products/${product._id}`)
    }catch(e){
        next(e);
    }
})

app.delete('/products/:id',async(req,res)=>{
    const {id} =req.params;
    const deletedproduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

//handling mongoose errors like valitaton error
const handleValidationErr =err =>{
     console.dir(err);
     return new AppError(`Validaton Failed....${err.message}`,400);
}
app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name==='ValidationError')err=handleValidationErr(err);
    next(err);
})

app.use((err,req,res,next)=>{
    const {status = 500 , message = 'something went wrong'} = err;
    res.status(status).send(message);
})

app.listen(port,()=>{
    console.log(`listening in port ${port}`);
})

