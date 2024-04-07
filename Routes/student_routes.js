const express = require('express');
const authenticate = require('../Middlewares/verificationMDW');
const {handleStudentSignUp, handleStudentLogin, getUserInfo, updateStudentInfo, getCourses, filterCourses, enrollInCourse, myCourses} = require('../Controllers/student_controller')

const studentRouter = express.Router();

studentRouter.post('/StuSignup',handleStudentSignUp);   //localhost:3000/StudyPulse/student/StuSignup
studentRouter.post('/StuLogin',handleStudentLogin);     //localhost:3000/StudyPulse/student/StuLogin
studentRouter.get('/StuInfo',authenticate,getUserInfo); //localhost:3000/StudyPulse/student/StuInfo
studentRouter.put('/updateStudentInfo',authenticate,updateStudentInfo)  //localhost:3000/StudyPulse/student/updateStudentInfo
studentRouter.get('/courses',authenticate,getCourses);  //localhost:3000/StudyPulse/student/courses
studentRouter.get('/filterCourses',authenticate,filterCourses);  //localhost:3000/StudyPulse/student/filterCourses
studentRouter.post('/enroll',authenticate,enrollInCourse);       //localhost:3000/StudyPulse/student/enroll
studentRouter.get('/myCourses',authenticate,myCourses);          //localhost:3000/StudyPulse/student/myCourses

module.exports = studentRouter;