const student_model = require('../Models/student_model');
const jwt = require('jsonwebtoken');


const handleStudentSignUp = async (req,res)=>{
    let student = req.body;
    const lastEnrollment = await student_model.findOne({
        order: [['createdAt', 'DESC']]
    });
    let roll = 1;
    if (lastEnrollment) {
        roll = lastEnrollment.roll + 1;
    }
    student["roll"] = roll;
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

const handleStudentLogin = async (req,res) =>{
    let user = req.body;  //destructuring in JS
    const email = user["email"];
    const pass = user['password'];
    const student = await student_model.findOne({where : {email : email}});
    if(student){
        if(pass==student['password']){
            jwt.sign({email : email},process.env.SECRETKEY,(err,token)=>{
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
        }else{
            res.json({"message" : "wrong email or password"});
        }
    }else{
        res.json({"message" : "wrong email or password"});   
    }
}

const getUserInfo = async (req,res)=>{
    console.log('inside getuserinfo')
    let user = req.body;  //destructuring in JS
    const email = user["email"];
    const student = await student_model.findOne({where : {email : email}});
    if(student){
        res.json(student);
    }else{
        res.json({"message" : "unable to get info"});
    }
}

module.exports = {handleStudentSignUp,handleStudentLogin,getUserInfo};