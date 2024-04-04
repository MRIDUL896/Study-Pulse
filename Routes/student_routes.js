const express = require('express');
const authenticate = require('../Middlewares/verificationMDW');
const {handleStudentSignUp, handleStudentLogin, getUserInfo, updateStudentInfo} = require('../Controllers/student_controller')

const studentRouter = express.Router();

studentRouter.post('/StuSignup',handleStudentSignUp);   //localhost:3000/StudyPulse/student/StuSignup
studentRouter.post('/StuLogin',handleStudentLogin);     //localhost:3000/StudyPulse/student/StuLogin
studentRouter.get('/StuInfo',authenticate,getUserInfo); //localhost:3000/StudyPulse/student/StuInfo
studentRouter.put('/updateStudentInfo',authenticate,updateStudentInfo)  //localhost:3000/StudyPulse/student/updateStudentInfo

module.exports = studentRouter;