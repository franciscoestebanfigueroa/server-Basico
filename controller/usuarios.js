const Usuario=require('../model/model-usuario');



const controllerEstadoUserOff = async(uid='')=>{

    const usuario = await Usuario.findById(uid);
   console.log('offline ',usuario.nombre)
    usuario.online=false;
    await usuario.save();

    uid='';
    return;
    //Usuario.findOneAndUpdate({'_id'})

}
const  controllerEstadoUserOn = async(uid='')=>{

    const usuariodb = await Usuario.findById(uid);
    console.log('cambiando estado de ',usuariodb.nombre,uid);
    usuariodb.online=true;
    await usuariodb.save();
    console.log('en contoller user');
   
//return usuariodb;
}



    



const controllerListUser =async(req,res=response)=>{
 const list=await Usuario.find();
    
res.json({

    'ok':true,
    'msg':'estado del usuario',
    'usuarios':list
});

}

module.exports={controllerListUser, controllerEstadoUserOn,controllerEstadoUserOff};