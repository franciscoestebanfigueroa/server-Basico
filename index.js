const express=require('express');
const app = express();
const path=require('path');
const { checkin } = require('./jwt/jwt');

const dotenv = require('dotenv').config();
const {dbConectar} =require('./database/config').dbConectar();
const { controllerEstadoUserOff,controllerEstadoUserOn}=require('./controller/usuarios');
const { grabarMensajes } = require('./controller/auth');


const publicPath=path.resolve(__dirname,'public');
app.use(express.static(publicPath));

//para body json
app.use(express.json());
//rutas
app.use('/api/login',require('./router/auth'));
app.use('/api/usuarios',require('./router/usuarios'));
app.use('/api/mensajes',require('./router/mensajes'));

const server=require('http').createServer(app);
const io=require('socket.io')(server);


io.on ('connection',cliente=>{
    
    // console.log(cliente.handshake.headers);
    

        const [valido,uid] = checkin(cliente.handshake.headers['x-token']);

  
    
    if(valido==false){
        console.log('desconectar por token false ');
        
        cliente.disconnect();
        return;

    }

    //ya en este punto estamos autenticado
     else{
        console.log('cliente autenticado ', uid);
        //controllerEstadoUserOn(uid);
        //console.log('estado ',estado);

        cliente.on('online',(data)=>{
            console.log('online' ,data);
            if(data==false){
                console.log('por favor desconectar' ,data);
                controllerEstadoUserOff(uid);
                io.emit('actualizar','actualizar');
                cliente.disconnect();
                return;
                    
            }
            else{
                io.emit('actualizar','actualizar');
                controllerEstadoUserOn(uid);
                cliente.join(uid) ;//crea una sala con nombre o id de uid
                cliente.on('sala',async(payload)=>{
                    console.log('sala-->',payload);
                    await grabarMensajes(payload);

                    io.to(payload.para).emit('sala',payload);
                    io.to(payload.de).emit('sala',payload);
                });



            }
        });
     }   
   

 
 


console.log('Conectado.. server socker ok..cliente conectado');

cliente.on('disconect',()=>{console.log('desconectado')});

cliente.emit('estado',{'estado':'ok','nombre':'pancho'});



}); 



server.listen(process.env.PORT,(err)=>{

    if(err) throw new Error(err);
    console.log('server ok' );

    

})
