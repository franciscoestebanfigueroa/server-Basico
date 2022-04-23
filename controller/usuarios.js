const { response } = require("express");

const Usuariox=require('../model/model-usuario');
const controllerListUser=async(req,res=response)=>{
const usuariodb= await Usuariox.findOne({email:'pancho@pancho.com'});
console.log('estudiando db',usuariodb.nombre);
    //if(){
    console.log('en contoller user');
    res.json({
'ok':true,
'msg':'Listado de usuarios'

});

}


    
//}


const controllerEstadoUser =(req,res=response,token='')=>{
 
    
res.json({
    'ok':true,
    'msg':'estado del usuario'
});

}

module.exports={controllerListUser,controllerEstadoUser};