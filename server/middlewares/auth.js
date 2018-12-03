passport = require('passport');

module.exports = auth_type=>(req,res,next)=>
    {
    passport.authenticate(auth_type,{session:false},(err,user,info)=>{
        if (err) req.user=null;
        else req.user=user;
        next();
        })(req,res,next);
    }