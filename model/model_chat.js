
const {Schema,model}= require('mongoose');

const MensajeSchema=Schema({

de:{
  type:Schema.Types.ObjectId,
  ref:'Usuario',
  required:true,
},
para:{
    type:Schema.Types.ObjectId,
    ref:'Usuario',
    required:true,
    unique:true
  },
  data:{
    type:String,
    require:true
  },
},
{
    timestamps:true
}
);

MensajeSchema.method('toJSON',function(){
  const {__v,_id,...data }=this.toObject();
  
  return data;

});

module.exports=model('Mensaje',MensajeSchema);//moongose guarda Mensaje pero le agrega una s ..mensajes