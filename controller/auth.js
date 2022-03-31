const { response } = require("express");
const { validationResult } = require("express-validator");

 const crearUsuario=(req,res=response)=>{

     const errores= validationResult(req);
     
        if (!errores.isEmpty())
        {
            console.log('error ');
            return res.status(400).json({
                ok:false,
                mge:errores.mapped()
            });
        }



    res.json({


        ok:true,
        mge:'hola'
    });


 };
 module.exports={crearUsuario};