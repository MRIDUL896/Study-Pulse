const Course = require("../Models/course_model");
const Enrollment = require("../Models/enrollment_model");
const student_model = require("../Models/student_model");
const jwt = require("jsonwebtoken");
const { Resend } = require("resend");
const resend = new Resend(process.env.RESENDKEY);
const pswdStrength = require("../Middlewares/passwordStrength");
const bcrypt = require("bcrypt");
const sendMail = require("../Middlewares/emailUtil");
const saltRounds = 10;


const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const handleStudentSignUp = async (req, res) => {
  let student = req.body;
  try {
    const pswd = student.password;
    if (pswdStrength(pswd) == "weak")
      res.json({ message: "password too weak" });
    else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(student.password, saltRounds);
      student.password = hashedPassword;
      //creating student
      const newStudent = await student_model.create(student);
      console.log("signup successful");
      // Format student details
      const studentDetails = `
      Name: ${newStudent.name}
      Email: ${newStudent.email}
      Roll: ${newStudent.studentID}`;
      // Send email
      await sendMail(newStudent.email,'Signup successful, your details',`You are now a srudent on Study Pulse ${studentDetails}`);
      res.json({ message: "signup successful", "new student": newStudent });
    }
  } catch (err) {
    console.log("signup unsuccessful");
    res.json({ message: "signup unsuccessful", error: err });
  }
};

const handleStudentLogin = async (req, res) => {
  let user = req.body; //destructuring in JS
  try {
    const email = user["email"];
    const pass = user["password"];
    const student = await student_model.findOne({ where: { email: email } });
    if (student) {
      bcrypt.compare(pass,student["password"],(err,result) => {
        if(err) res.json('Incorrect passowrd0')
        else if(result){
          jwt.sign({ email: email }, process.env.SECRETKEY, (err, token) => {
            if (err) {
              res.send({ Message: "Something is wrong", err: err });
            } else {
              res.json({
                Message: "Login Successful",
                data: req.body,
                token: token,
              });
            }
          });
        }
        else res.json({ message: "wrong email or password2" });
      })
    } else {
      res.json({ message: "wrong email or password2" });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

const getUserInfo = async (req, res) => {
  try {
    console.log("inside getuserinfo");
    let user = req.body; //destructuring in JS
    const email = user["email"];
    const student = await student_model.findOne({ where: { email: email } });
    if (student) {
      res.json(student);
    } else {
      res.json({ message: "unable to get info" });
    }
  } catch (err) {
    res.json({ error: err });
  }
};

const updateStudentInfo = async (req, res) => {
  try {
    const mail = req.body["email"];
    const student = await student_model.findOne({ where: { email: mail } });
    const newName = req.body["newName"] ? req.body["newName"] : student.name;
    const newEmail = req.body["newEmail"]
      ? req.body["newEmail"]
      : student.email;
    const [rowsAffected, updatedStudent] = await student_model.update(
      { name: newName, email: newEmail },
      { where: { studentID: student["studentID"] } }
    );
    if (rowsAffected == 1) {
      res.json({
        message: "updated successfully",
        updatedInfo: updatedStudent,
      });
    } else {
      res.json({ error: err });
    }
  } catch (err) {
    res.json({ error: err });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    if (courses) {
      res.json(courses);
    } else {
      res.json({ error: "error finding courses" });
    }
  } catch (err) {
    res.json({ error: "error finding courses" });
  }
};

const filterCourses = async (req, res) => {
  const { category, level, popularity } = req.body;
  console.log(category, level, popularity);
  try {
    const courses = await Course.findAll({
      where: {
        ...(category && { category }),
        ...(level && { level }),
        ...(popularity && { popularity }),
      },
    });
    console.log(courses);
    if (courses) res.json(courses);
    else res.json({ error: "error finding courses" });
  } catch (err) {
    res.json({ error: "error finding courses" });
  }
};

const enrollInCourse = async (req, res) => {
  const { studentID, courseID } = req.body;

  try {
    // Check if the enrollment already exists
    const existingEnrollment = await Enrollment.findOne({
      where: {
        studentID: studentID,
        courseID: courseID,
      },
    });
    //check limit of course students
    const course = await Course.findByPk(courseID);
    if (course.studentCount == 100) {
      return res.status(400).json({ error: "Student limit exceeded" });
    } else {
      if (existingEnrollment) {
        return res
          .status(400)
          .json({ error: "Student is already enrolled in the course" });
      } else {
        // Create a new enrollment
        await Enrollment.create({
          studentID: studentID,
          courseID: courseID,
        });

        // Increment the studentCount for the course
        if (course) {
          await course.increment("studentCount");
        } else {
          return res.status(404).json({ error: "Course not found" });
        }
        const student = await findByPk(studentID);
        await sendMail(student.email,'Enrolled successfully',`You enrolled in Study Pulse's ${course.name} course`);
        res.json({ message: "Enrolled successfully" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to enroll in course" });
  }
};

const myCourses = async (req, res) => {
  const { email } = req.body;
  try {
    const student = await student_model.findOne({ where: { email: email } });
    const courses = await student.getCourses();
    res.json({ courses });
  } catch (err) {
    res.json({ error: "error finding courses" });
  }
};

module.exports = {
  handleStudentSignUp,
  handleStudentLogin,
  getUserInfo,
  updateStudentInfo,
  getCourses,
  filterCourses,
  enrollInCourse,
  myCourses,
};
