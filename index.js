const express=require('express');
const app = express();
const path=require('path');
const { checkin } = require('./jwt/jwt');
const jwt=require('jsonwebtoken');
const dotenv = require('dotenv').config();
const {dbConectar} =require('./database/config').dbConectar();


const publicPath=path.resolve(__dirname,'public');
app.use(express.static(publicPath));

//para body json
app.use(express.json());
//rutas
app.use('/api/login',require('./router/auth'));
app.use('/api/usuarios',require('./router/usuarios'));

const server=require('http').createServer(app);
const io=require('socket.io')(server);


io.on('connection',cliente=>{
    
    // console.log(cliente.handshake.headers);
    const [valido,uid] = checkin(cliente.handshake.headers['x-token']);
    if(valido==false){
        console.log('desconectar ');
        cliente.disconnect();
    }

    //ya en este punto estamos autenticado

    cliente.on('jwt',(data)=>{
    const {uid} = jwt.verify(data,process.env.JWTKEY);
    console.log('cambiando estado de cliente uid ',uid);
        console.log(data);
    });
   

 
 


console.log('Conectado.. server socker ok..cliente conectado');

cliente.on('disconect',()=>{console.log('desconectado')});

cliente.emit('estado',{'estado':'ok','nombre':'pancho'});

}); 



server.listen(process.env.PORT,(err)=>{

    if(err) throw new Error(err);
    console.log('server ok' );

    

})
