// path 

const { response } = require('express');
const express = require('express');
const {Router}=require('express');
const  router=Router();
//const router = require('express').Router();

router.post('/new',(req,res=response)=>{

    res.json({
        ok:true,
        msg:'crear usuario'
    })
});


module.exports=router;