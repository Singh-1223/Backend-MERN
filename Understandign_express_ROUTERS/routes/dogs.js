const express = require('express');
const router = express.Router();

router.get('/dog',(req,res)=>{
    res.send("All dog");
})


router.post('/',(req,res)=>{
    res.send("Creating dog");
})

router.get('/:id',(req,res)=>{
    res.send("Viewing One dog");
})

router.get('/:id/edit',(req,res)=>{
    res.send("Editing ONe dog");
})

module.exports = router;