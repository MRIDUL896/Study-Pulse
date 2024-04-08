const pswdStrength = require("../Middlewares/passwordStrength");
const Course = require("../Models/course_model");
const SuperAdmin = require("../Models/superAdmin_model");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESENDKEY);
const bcrypt = require('bcrypt');
const saltRounds = 10;

const handleAdminSignUp = async (req, res) => {
  let admin = req.body;
  try {
    const pswd = admin.password;
    if(pswdStrength(pswd)=="weak") res.json({ message: "password too weak" });
    else{
      // Hash the password
      const hashedPassword = await bcrypt.hash(admin.password, saltRounds);
      admin.password = hashedPassword;
      //creating admin
      const newAdmin = await SuperAdmin.create(admin);
      // Format student details
      const adminDetails = `
      Name: ${newAdmin.name}
      Email: ${newAdmin.email}
      Roll: ${newAdmin.adminID}`;
      // Send email
      await sendMail(newAdmin.email,'Signup successful, your details',`You are now an admin on Study Pulse ${newAdmin}`);
      res.json({ message: "signup successful", "new admin": newAdmin });
    }
  } catch (err) {
    console.log("signup unsuccessfull2");
    res.json({ message: "signup unsuccessful", error: err });
  }
};

const handleAdminLogin = async (req, res) => {
  let user = req.body; //destructuring in JS
  try {
    const email = user["email"];
    const pass = user["password"];
    const admin = await SuperAdmin.findOne({ where: { email: email } });
    if (admin) {
      bcrypt.compare(pass,admin["password"],(err,result) => {
        if(err) res.send({ Message: "Something is wrong", err: err });
        else if(result){
          jwt.sign({ email: email }, process.env.SECRETKEY, (err, token) => {
            if (err) {
              res.send({ Message: "Something is wrong", err: err });
            } else  {
              res.json({
                Message: "Login Successful, Welcome admin",
                data: req.body,
                token: token,
              });
            }
          });
        }
        else res.json({ message: "wrong email or password2" });
      })
    } else {
      res.json({ message: "wrong email or password3" });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

const getAdminInfo = async (req, res) => {
  try {
    console.log("inside getAdminInfo");
    let user = req.body; //destructuring in JS
    const email = user["email"];
    const admin = await SuperAdmin.findOne({ where: { email: email } });
    if (admin) {
      res.json(admin);
    } else {
      res.json({ message: "unable to get info" });
    }
  } catch (err) {
    res.json({ error: err });
  }
};

const updateAdminInfo = async (req, res) => {
  try {
    const mail = req.body["email"];
    const admin = await SuperAdmin.findOne({ where: { email: mail } });
    const newName = req.body["newName"];
    const newEmail = req.body["newEmail"];
    const newPassword = req.body["newPassword"];
    const [rowsAffected, updatedAdmin] = await SuperAdmin.update(
      { name: newName, email: newEmail, password: newPassword },
      { where: { adminID: admin["adminID"] } }
    );
    if (rowsAffected == 1) {
      res.json({
        message: "updated successfully",
        updatedInfo: updatedAdmin,
      });
    } else {
      res.json({ error: err });
    }
  } catch (err) {
    res.json({ error: err });
  }
};

const createCourse = async (req, res) => {
  try {
    const newCourse = req.body;
    Course.create(newCourse)
      .then(() => {
        res.json({ message: "Course created successfully", course: newCourse });
      })
      .catch((err) => {
        res.json({ message: "course not created", error: err });
      });
  } catch (err) {
    res.json({ message: "course not created", error: err });
  }
}

const getCourseInfo = async (req, res) => {
  try{
    const courseID = req.body.courseID;
    const courseName = req.body.name;
    if(courseID){
      const course = await Course.findOne({ where : { courseID : courseID  }});
      if(course) res.json({ "info" : course});
      else  res.json({"error" : "not found"});
    }else{
      const course = await Course.findOne({ where : { name : courseName}});
      if(course) res.json({ "info" : course});
      else  res.json({"error" : "not found"});
    }
  }catch(err){
    res.json({"error" : err});
  }
}

const updateCourse = async (req,res) => {
  try{
  const requested = req.body;
  const courseID = requested.courseID;
  const courseName = requested.name;
  let course;
  if(courseID) course = await Course.findOne({ where : { courseID : courseID  }});
  else{
    course = await Course.findOne({ where : { name : courseName}});
    courseID = course.courseID
  }
  const newName = requested.newName ? requested.newName : course.name;
  const newInstructor = requested.newInstructor ? requested.newInstructor : course.instructor;
  const newPrice = requested.newPrice ? requested.newPrice : course.price;
  const newDescription = requested.newDescription ? requested.newDescription : course.description;
  const newCategory = requested.newCategory ? requested.newCategory : course.category;
  const [rowsAffected,updatedCourse] = await Course.update(
    { name : newName, instructor : newInstructor, price : newPrice, description : newDescription, category : newCategory},
    { where : { courseID : courseID}}
  )
  if (rowsAffected==1) {
    res.json({
      "message": "updated successfully",
      "updatedInfo": updatedCourse,
    });
  } else {
    res.json({ error: "error while updating info" });
  }
  }catch(err){
    res.json({ error: "error while updating info" });
  }
}

const deleteCourse = async (req,res) => {
  try{
  const requested = req.body;
  let courseID = requested.courseID;
  let courseName = requested.name;
  let course;
  if(courseID) course = await Course.findOne({ where : { courseID : courseID  }});
  else{
    course = await Course.findOne({ where : { name : courseName}});
    courseID = course.courseID;
  }
  const rowsDeleted = await Course.destroy({ where: { courseID : courseID } });
  if(rowsDeleted==0){
    res.json({"error" : "unable to delete check course name or time"});
  }else{
    res.json({message : "deletion successfull"})
  }
  }catch(err){
    res.json({"error" : "unable to delete check course name or time"});
  }
}

module.exports = {
  handleAdminSignUp,
  handleAdminLogin,
  getAdminInfo,
  updateAdminInfo,
  createCourse,
  getCourseInfo,
  updateCourse,
  deleteCourse
};
