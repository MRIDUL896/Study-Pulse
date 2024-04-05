const student_model = require("../Models/student_model");
const jwt = require("jsonwebtoken");

const handleStudentSignUp = async (req, res) => {
  let student = req.body;
  try {
    student_model
      .create(student)
      .then(() => {
        console.log("signup successfull");
        res.json({ 'message': "signup successful", "new student": student });
      })
      .catch((err) => {
        console.log("signup unsuccessfull");
        res.json({ 'message': "signup unsuccessful", error: err });
      });
  } catch (err) {
    console.log("signup unsuccessfull");
    res.json({ "message": "signup unsuccessful", error: err });
  }
}

const handleStudentLogin = async (req, res) => {
  let user = req.body; //destructuring in JS
  try {
    const email = user["email"];
    const pass = user["password"];
    const student = await student_model.findOne({ where: { email: email } });
    if (student) {
      if (pass == student["password"]) {
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
      } else {
        res.json({ message: "wrong email or password1" });
      }
    } else {
      res.json({ message: "wrong email or password2" });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
}

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
}

const updateStudentInfo = async (req, res) => {
  try {
    const mail = req.body["email"];
    const student = await student_model.findOne({ where: { email: mail } });
    const newName = req.body["newName"];
    const newEmail = req.body["newEmail"];
    const newPassword = req.body["newPassword"];
    const [rowsAffected,updatedStudent] = await student_model.update(
      { name : newName, email :newEmail, password : newPassword },
      { where: { studentID: student["studentID"] } }
    );
    if (rowsAffected==1) {
      res.json({
        "message": "updated successfully",
        "updatedInfo": updatedStudent,
      });
    } else {
      res.json({ error: err });
    }
  } catch (err) {
    res.json({ error: err });
  }
}

module.exports = { handleStudentSignUp, handleStudentLogin, getUserInfo ,updateStudentInfo};
