# Study Pulse

## Description
Backend code for an e-learning platform.

### Tools and Technologies Use
- ExpessJS in NodeJS : for server
- Neon : for online postgres database
- Sequelize : for object relational mapping (JS to Postgres commands conversion)
- Postman : for checking restful APIs and ease of development
- Gituhub : for maintaining code

## Progress 
Below is the small journal of my progress in this project.

### Day 1 (2 April, 2024)
- Set up server using Express.
- Established connection with Neon.tech PostgreSQL using Sequelize package.
- Defined schema for students.
- Added student login and signup functionality.

### Day 2 (3 April, 2024)
- Created a middleware for authentication using jwt tokens.
- Added information fetching functionality for students.

### Day 3 (4 April, 2024)
- Added update information functionality for students.
- Defined schema for courses and made a many to many relationship between courses and students.
- Defined schema for superadmin. 

### Day 4 (5 April, 2024)
- Added fuctionalities for admin like login, get info,update info and create course.

### Day 5 (6 April, 2024)
- Added get, update and delete course information fuctionalities for admin.

### Day 6 (7 April, 2024)
- Added API endpoint to fetch courses available on the platform. Implement filtering options based on parameters such as category, level, popularity.
- Added API for course enrollment and fecthing enrolled courses for students. 
- Integrated resend.com's free tier for student signup notification.