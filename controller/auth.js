const { response } = require("express");
const Usuario = require("../model/model-usuario");
const bcryp=require('bcryptjs');
const { creartoken } = require("../jwt/jwt");

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
     
    const token =await creartoken(usuario._id);//puede ser uid

    res.json({

        ok: true,
        mge: 'Usuario creado',
        usuario,
        token


    });
    
} catch (error) {
    console.log('conectarse con el administrador' ,error)
    
}





};
const login = async(req,res=response)=>{

//const usuario=new Usuario(req.body);    
const { email,password} = req.body;

    try {
       
       const usuariodb = await Usuario.findOne({email});
        if(!usuariodb){
           return  res.status(404).json({
                ok:true,
                mge:'mail  no encontrado'
        
            });    
        
        }

        const checkPass= bcryp.compareSync(password,usuariodb.password);
        if(!checkPass){

            return res.status(500).json({
                ok:false,
                mge:'pass '
            });
        }

                //generar jwt

               const newToken = await creartoken(usuariodb._id);




    
        res.json({
            ok:true,
            mge:'login',
            usuariodb,
            newToken
    
        });
    
    
    } catch (error) {
        
        res.status(400).json({
            ok:false,
            mge:'error login cath'
    
        });
    }


};
const reNewJWT=async(req,res=response)=>{

//const tokenOld= req.

try {
    const user =await Usuario.findById(req.uid);
    const tokenNew= await creartoken(req.uid);

res.json({
    tokenNew,
    nombre:user,
    id:req.uid,
    ok:true,
    mge:'renew Token'
});


} catch (error) {
    
res.status(404).json({
    ok:false,
    mge:'error hable administrador'
});

}

};

    



module.exports = { crearUsuario ,login,reNewJWT}