const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
app.use(express.json())
app.use(cors())
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000
const signup_route = require('./Routes/signupRoutes.js')
const { errorhandling } = require('./Middlewares/errorhandling.js')
const con = require('./db.js')
app.use('/', signup_route)
app.use(errorhandling)


const connectionfunction = () => {
  con.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });
  app.listen(PORT, () => {
    console.log('server is running')
  });
}
connectionfunction();