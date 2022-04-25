
const { response } = require('express');
const express = require('express');
const {Router}=require('express');
const {controllerListUser,controllerEstadoUser} = require('../controller/usuarios');

const {validarJWT} = require('../middleware/validarJWT');
const  routerUsuarios=Router();

//const router = require('express').Router();


//hay que pedir el jwt 
//
//router.post('/new',[
//    check('nombre','falta el nombre').not().isEmpty(),
//    controlUserMw,
//    check('email','falta correo').isEmail(),
//    controlUserMw,
//    check('password','falta el contraseña').not().isEmpty(),
//    controlUserMw,
//]
//,crearUsuario);
//


routerUsuarios.get('/listado', 
//validarJWT,
controllerListUser);


module.exports=routerUsuarios;