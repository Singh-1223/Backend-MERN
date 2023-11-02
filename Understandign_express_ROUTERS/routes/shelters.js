const express = require('express');
const router = express.Router();

router.get('/shelters',(req,res)=>{
    res.send("All Shelters");
})

// router.get('/',(req,res)=>{
//     res.send("All Shelters");
// })

router.post('/',(req,res)=>{
    res.send("Creating Shelters");
})

router.get('/:id',(req,res)=>{
    res.send("Viewing One Shelters");
})

router.get('/:id/edit',(req,res)=>{
    res.send("Editing ONe Shelters");
})

module.exports = router;