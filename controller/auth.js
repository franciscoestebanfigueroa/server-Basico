const { response } = require("express");
const Usuario = require("../model/model-usuario");
const bcryp=require('bcryptjs');

const crearUsuario = async(req, res = response) => {

    const usuario = new Usuario(req.body);

    //const email=usuario.email;
    const {email,password} =req.body;

try {
    //const emailExistente=Usuario.findOne({email:email})
    const emailExistente = await Usuario.findOne({email});
    if(emailExistente){
        return res.status(400).json({
            ok:false,
            mge:'correo exixtente '
        }); 
    } 


    const salt=bcryp.genSaltSync();
    usuario.password=bcryp.hashSync(password,salt); 

    await usuario.save();


    res.json({

        ok: true,
        mge: 'Usuario creado',
        dataBody:usuario


    });
    
} catch (error) {
    console.log('conectarse con el administrador' ,error)
    
}



   


};
module.exports = { crearUsuario }