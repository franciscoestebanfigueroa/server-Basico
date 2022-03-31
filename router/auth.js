// path 

const { response } = require('express');
const express = require('express');
const {Router}=require('express');
const { check } = require('express-validator');
const { crearUsuario } = require('../controller/auth');
const { controlUser } = require('../middleware/control-usuarios');
const  router=Router();
//const router = require('express').Router();

router.post('/new',[
    check('nombre','falta el nombre').not().isEmpty(),
    controlUser,
]
,crearUsuario);


module.exports=router;