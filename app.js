const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const Student = require('./Models/student_model');
const sequelize = require('./config/database');
const userRouter = require('./Routes/student_Router');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

//establishing connection with database
sequelize.authenticate().then(()=>{
    console.log('Connected to the database successfully');
}).catch((err)=>{
    console.log('Error connecting to the database:', err);
});

//syncing with database(updation)
sequelize.sync({ force: true }).then(()=>{
    console.log('Database sync is successfull');
}).catch((err) => {
    console.error('Database sync is unsuccessfull', err);
});

app.use('/StudyPulse/student',userRouter);

const port = process.env.PORT;
app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});