const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(express.json())
app.use(cors())
app.use(cookieParser())
require('dotenv').config()
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000
const signup_route = require('./Routes/signupRoutes.js')
const { errorhandling } = require('./Middlewares/errorhandling.js')
const con = require('./db.js')
app.use('/', signup_route)
app.use(errorhandling)


const connectionfunction = () => {
  app.listen(PORT, () => {
    console.log('server is running')
  });
}
connectionfunction();