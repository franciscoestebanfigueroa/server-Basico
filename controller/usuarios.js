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
//paginacion
const desde=Number(req.query.desde)||0;//trasformo a numero el string se agrega despues del router usuarios el simbolo ?desde=5



 const list=await Usuario.
 //find()//muestra todo 
 find({_id:{$ne:req.uid}})//{}para ponerle parametros ej {id:'pepe'}..$ne es negado muestra todos menos yo,requerda que enviamos internamente el uid a req
 .sort('-online')//ordena por boleaanos y el - para desendente
 .skip(desde)//saltar a variable 
 .limit(20)//limita 
 ;
    
res.json({

    'ok':true,
    'msg':'estado del usuario',
    'usuarios':list,
    //desde
});

}

module.exports={controllerListUser, controllerEstadoUserOn,controllerEstadoUserOff};