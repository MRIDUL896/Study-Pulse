const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
dotenv.config();

const password = process.env.PASSWORD;
const DATABASE_URL = `postgresql://study_pulse_DB_owner:${password}@ep-lingering-snow-a1qu88bj-pooler.ap-southeast-1.aws.neon.tech/study_pulse_DB?sslmode=require`;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

module.exports = sequelize;