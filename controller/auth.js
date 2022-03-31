const { response } = require("express");


const crearUsuario = (req, resp = response) => {


    resp.json({

        ok: true,
        mge: 'hola'
    });


};
module.exports = { crearUsuario };