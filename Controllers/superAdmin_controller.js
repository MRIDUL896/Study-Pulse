const Course = require("../Models/course_model");
const SuperAdmin = require("../Models/superAdmin_model");
const jwt = require("jsonwebtoken");

const handleAdminSignUp = async (req, res) => {
  let admin = req.body;
  try {
    SuperAdmin.create(admin)
      .then(() => {
        console.log("signup successfull");
        res.json({ message: "signup successful", "new admin": admin });
      })
      .catch((err) => {
        console.log("signup unsuccessfull");
        res.json({ message: "signup unsuccessful", error: err });
      });
  } catch (err) {
    console.log("signup unsuccessfull");
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
      if (pass == admin["password"]) {
        jwt.sign({ email: email }, process.env.SECRETKEY, (err, token) => {
          if (err) {
            res.send({ Message: "Something is wrong", err: err });
          } else {
            res.json({
              Message: "Login Successful, Welcome admin",
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
};

module.exports = {
  handleAdminSignUp,
  handleAdminLogin,
  getAdminInfo,
  updateAdminInfo,
  createCourse
};
