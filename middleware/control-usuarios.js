
const { validationResult } = require("express-validator");

const controlUser=(req,res,next)=>{

console.log(req,res,)
    const errors=validationResult(req);

if(!errors.isEmpty){
    return res.status(400).json({

        ok:false,
        mge:errors.mapped()

    });

}
next();

}
module.exports={
    controlUser
}