const express = require('express');
const { handleStudentSignUp, handleStudentLogin } = require('../Controllers/student_controller');
const userRouter = express.Router();

userRouter.post('/signup',handleStudentSignUp);   //localhost:3000/StudyPulse/student/signup
userRouter.post('/login',handleStudentLogin);   //localhost:3000/StudyPulse/student/login


module.exports = userRouter;