const express = require('express');
const authenticate = require('../Middlewares/verificationMDW')
const { handleAdminSignUp, handleAdminLogin, getAdminInfo, updateAdminInfo, createCourse } = require('../Controllers/superAdmin_controller');

const adminRouter = express.Router();

adminRouter.post('/AdminSignup',handleAdminSignUp);               //localhost:3000/StudyPulse/admin/AdminSignup
adminRouter.post('/AdminLogin',handleAdminLogin);                 //localhost:3000/StudyPulse/admin/AdminLogin
adminRouter.get('/AdminInfo',authenticate,getAdminInfo);          //localhost:3000/StudyPulse/admin/AdminInfo
adminRouter.put('/UpdateAdminInfo',authenticate,updateAdminInfo); //localhost:3000/StudyPulse/admin/UpdateAdminInfo
adminRouter.post('/addCourse',authenticate,createCourse);         //localhost:3000/StudyPulse/admin/addCourse

module.exports = adminRouter;