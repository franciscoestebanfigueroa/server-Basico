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



module.exports={creartoken};





