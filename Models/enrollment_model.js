const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const Enrollment = sequelize.define('Enrollment',{
    //add needed additional attributes
},{
    tablename : 'Enrollments'
})

module.exports =  Enrollment;