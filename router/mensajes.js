// api/mensajes

const { Router } = require("express");
const { controlerMesnsaje } = require("../controller/mensaje");
const { validarJWT } = require("../middleware/validarJWT");


const routerMensaje=Router();


routerMensaje.get('/:de',[validarJWT],controlerMesnsaje);//lo que ingrese despues de la // va a cargarse en la variable de en req.params.de


module.exports=routerMensaje;







