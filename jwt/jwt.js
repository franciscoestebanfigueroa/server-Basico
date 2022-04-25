const { rejects } = require('assert');
const jwt=require('jsonwebtoken');
const { resolve } = require('path');

const creartoken=(uid)=>{

    return new Promise((resolve,rejects)=>{

        const payload={uid}


        jwt.sign(payload,process.env.JWTKEY,{expiresIn:'24h'},
        (err,token)=>{
            if(err){
                rejects('no se pudo crear Token') //es como si disparara el cath
                console.log('error creacion Token');
            }
            else{
                resolve( token);//retorna 
            }
        }
        
        );


    });

}
const  checkin=(token='')=>{

    try {

        const {uid} = jwt.verify(token,process.env.JWTKEY); 
       // console.log('bienvenido ',uid);
        
        return [true,uid];//vamos a dejar asi, para recordar que podemos regresar [ a,b]
        
    } catch (error) {
        console.log( 'erorrrr',error);
        return [false,null];
        
        
    }


}


module.exports={creartoken,checkin};





