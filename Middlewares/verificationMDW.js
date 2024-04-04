const jwt = require('jsonwebtoken');

const authenticate = (req,res,next)=>{
    const tokencheck = req.headers['authorization'];
    const extracted = tokencheck.split(' ')[1];
    if(extracted){
        jwt.verify(extracted,process.env.SECRETKEY,(err,decoded)=>{
            if(err){
                res.json({"message" : "error authenticating","error" : err});
            }else{
                req.email = decoded.email;
                console.log("autheticate ending")
                next();
            }
        })
    }
}

module.exports = authenticate;