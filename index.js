const express=require('express');
const app = express();
const path=require('path');
const dotenv = require('dotenv').config();

const publicPath=path.resolve(__dirname,'public');
app.use(express.static(publicPath));

const server=require('http').createServer(app);
const io=require('socket.io')(server);


io.on('connection',cliente=>{

console.log('Conectado.. server socker ok..cliente conectado');

cliente.on('disconect',()=>{console.log('desconectado')});

}); 



server.listen(process.env.PORT,(err)=>{

    if(err) throw new Error(err);
    console.log('server ok' );

    

})
