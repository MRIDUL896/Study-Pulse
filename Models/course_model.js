const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./student_model');
const Enrollment = require('./enrollment_model');

const Course = sequelize.define('Course',{
    courseID : {
        type : DataTypes.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    instructor : {
        type : DataTypes.STRING,
        allowNull : false
    }, 
    price : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    description : {
        type : DataTypes.STRING
    },
    isLive : {
        type : DataTypes.BOOLEAN,
        //allowNull : false
    },
    category : {
        type : DataTypes.STRING,
        allowNull : false
    },
    level : {
        type : DataTypes.STRING,
        allowNull : false
    },
    rating : {
        type : DataTypes.INTEGER,
        validate : {
            min : 0,
            max : 5
        }
    },
    startDate : {
        type : DataTypes.DATE,
        //allowNull : false
    },
    studentCount : {
        type : DataTypes.INTEGER
    }
},{
    tableName : 'courses'
})


// {
//     "name" : "",
//     "instructor" : "",
//     "price" : "",
//     "description" : "",
//     "islive" : "",
//     "category" : "",
//     "level" : ""
// }

module.exports = Course;