// path 

const { response } = require('express');
const express = require('express');
const {Router}=require('express');
const { check } = require('express-validator');
const { crearUsuario,login,reNewJWT } = require('../controller/auth');
const { controlUserMw } = require('../middleware/control-usuarios');
const {validarJWT} = require('../middleware/validarJWT');
const  router=Router();
//const router = require('express').Router();

router.post('/new',[
    check('nombre','falta el nombre').not().isEmpty(),
    controlUserMw,
    check('password','falta el contraseña').not().isEmpty(),
    controlUserMw,
    check('email','falta correo').isEmail(),
    controlUserMw
]
,crearUsuario);


router.post('/',[
    check('email','falta correo').isEmail(),
    controlUserMw,
    check('password','falta la contraseña').not().isEmpty(),
    controlUserMw

],login);

router.get('/renew', [validarJWT],reNewJWT);

module.exports=router;