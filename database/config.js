const mongoose=require('mongoose');

const dbConectar = async()=>{

    try {

            await mongoose.connect(process.env.DB_CNN,{
                  useNewUrlParser:true,
                  useUnifiedTopology:true,
                  //useCreateindex:true

            })


        console.log('DB Online');
    } catch (error) {
        throw new Error(error)
        console.log('error de comunicacion', error)
        
    }
}
module.exports = {dbConectar};
