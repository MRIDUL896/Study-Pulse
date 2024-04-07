const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Enrollment = sequelize.define('Enrollment',{
    studentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Student',
          key: 'studentID'
        }
      },
      courseID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Course',
          key: 'courseID'
        }
      }
},{
    tablename : 'Enrollments'
})

module.exports =  Enrollment;