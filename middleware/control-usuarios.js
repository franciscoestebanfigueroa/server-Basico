
const { validationResult } = require("express-validator");


const controlUserMw=(req,res,next)=>{
 console.log(req.body);

    const errors=validationResult(req);

if(!errors.isEmpty()){
    return res.status(400).json({

        ok:false,
        mge:errors.mapped()

    });

}
next();

}
module.exports={
    controlUserMw
}