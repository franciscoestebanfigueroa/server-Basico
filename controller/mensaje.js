const { response } = require("express");
const Mensaje = require("../model/model_chat");


const controlerMesnsaje = async(req,res=response,)=>{
    const miId=req.uid;    
    const para=req.params.de;

const ultimos30=await Mensaje
.find({ $or:[{de:miId,para:para},{de:para,para:miId} ] } )
.sort({createdAt:'desc'})
.limit(30)

;


res.json({
    de:req.uid,
    para,
    mensaje:'historial chat',
    ultimos30
});



console.log('en controler mensaje');

}





module.exports={controlerMesnsaje}