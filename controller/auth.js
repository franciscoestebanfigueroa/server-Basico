const { response } = require("express");
const Usuario = require("../model/model-usuario");


const crearUsuario = async(req, res = response) => {

    const usuario = new Usuario(req.body);

    await usuario.save();


    res.json({

        ok: true,
        mge: 'Usuario creado',
    //    dataBody:req.body


    });


};
module.exports = { crearUsuario }