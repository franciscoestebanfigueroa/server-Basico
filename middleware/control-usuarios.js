
const { validationResult } = require("express-validator");


const controlUserMw=(req,res,next)=>{
 console.log(req.body);

    const errors=validationResult(req);

if(!errors.isEmpty()){
    return res.status(400).json({

        ok:false,
       // msg:errors.mapped(),
        msg:errors['errors'][0]['msg']
        

    });

}
next();

}
module.exports={
    controlUserMw
}