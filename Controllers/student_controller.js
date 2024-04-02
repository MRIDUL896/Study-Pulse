const student_model = require('../Models/student_model');
const jwt = require('jsonwebtoken');

const handleStudentSignUp = (req,res)=>{
    let student = req.body;
    student["roll"] = Math.floor(Math.random()*10000000);
    try{
        student_model.create(student).then(()=>{
            console.log('signup successfull');
            res.json({"message" : "signup successful","new student" : student})
        }).catch((err)=>{
            console.log('signup unsuccessfull');
            res.json({"message" : "signup unsuccessful","error" : err})
        })
    }catch(err){
        console.log('signup unsuccessfull');
        res.json({"message" : "signup unsuccessful","error" : err})
    }
}

const handleStudentLogin = (req,res) =>{
    let user = req.body;  //destructuring in JS
    const email = user["email"];
    const student = student_model.findOne({where : {email : email}});
    if(student){
        jwt.sign(req.body,process.env.SECRETKEY,(err,token)=>{
            if(err){
                res.send({"Message" : "Something is wrong","err" : err,});
            }else{
                res.json({
                    "Message" : "Login Successful",
                    "data" : req.body ,
                    token : token
                })
            }
        })
    }
}

module.exports = {handleStudentSignUp,handleStudentLogin};