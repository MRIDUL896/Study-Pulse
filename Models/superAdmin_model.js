const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const SuperAdmin = sequelize.define('SuperAdmin', {
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
    adminID : {
      type : DataTypes.INTEGER,
      // allowNull: false,
      unique : true,
      autoIncrement : true,
      primaryKey : true
    },
  }, {
    tableName: 'SuperAdmins',
});

module.exports = SuperAdmin;