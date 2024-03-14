const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
app.use(express.json())
app.use(cors())
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000
const OWN_URL = process.env.OWN_URL || 'http://localhost:5000';
const signup_route=require('./Routes/signupRoutes.js')
const salary_route=require('./Routes/salaryRoutes.js')
const {errorhandling}=require('./Middlewares/errorhandling.js')
const db = require('./db.js')
db.sequelize.sync({alter:true}).then(() => {
  console.log("connection completed")
}).catch((error) => {
  console.log(error)
})
app.use('/',signup_route)
app.use('/salary',salary_route)
app.use(errorhandling)
app.listen(PORT,()=>{
    console.log('server is running')
});

