const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./student_model');
const Enrollment = require('./enrollment_model');

const Course = sequelize.define('Course',{
    courseID : {
        type : DataTypes.INTEGER,
        allowNull : false,
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
        type : DataTypes.INTEGER
    },
    isLive : {
        type : DataTypes.BOOLEAN,
        allowNull : false
    },
    category : {
        type : DataTypes.BOOLEAN,
        allowNull : false
    },
    level : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    rating : {
        type : DataTypes.INTEGER,
        allowNull : false,
        validate : {
            min : 0,
            max : 5
        }
    },
    startDate : {
        type : DataTypes.DATE,
        allowNull : false
    }
},{
    tableName : 'courses'
})

// Course.belongsToMany(Student,{
//     through : Enrollment,
//     foreignKey : 'courseID',
//     otherKey : 'studentID',
//     attributes : ['name','email','roll']
// })

module.exports = Course;