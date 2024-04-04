const express = require('express');
const authenticate = require('../Middlewares/verificationMDW');
const {handleStudentSignUp, handleStudentLogin, getUserInfo} = require('../Controllers/student_controller')

const studentRouter = express.Router();

studentRouter.post('/signup',handleStudentSignUp);   //localhost:3000/StudyPulse/student/signup
studentRouter.post('/login',handleStudentLogin);     //localhost:3000/StudyPulse/student/login
studentRouter.get('/info',authenticate,getUserInfo); //localhost:3000/StudyPulse/student/info


module.exports = studentRouter;