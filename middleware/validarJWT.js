const { creartoken } = require("../jwt/jwt");
const jwt = require('jsonwebtoken');




const validarJWT=(req,res,next)=>{

const token=req.header('x-token');
console.log(token);

if(!token){
return res.status(401).json({
    ok:false,
    msg:'no hay token'
});
    
}
try {

    const {uid} = jwt.verify(token,process.env.JWTKEY); 
    req.uid=uid; //creamos req.uid para usarlo despues en filtro 
   
 

next();
    
} catch (error) {
    return res.status(401).json({
        ok:false,
        msg:'token no valido cath'
})}






};




module.exports={validarJWT};