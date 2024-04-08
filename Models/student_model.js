const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Course = require('./course_model');
const Enrollment = require('./enrollment_model');

const Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  studentID : {
    type : DataTypes.INTEGER,
    // allowNull: false,
    autoIncrement : true,
    primaryKey : true
  },
  profilePhoto : {
    type : DataTypes.BLOB
  }
}, {
  tableName: 'students',
});

Student.belongsToMany(Course,{
  through : Enrollment,
  foreignKey : 'studentID',
  otherKey : 'courseID'
})

module.exports = Student;