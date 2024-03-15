const express = require("express");
const router = express.Router();
const jwt=require('jsonwebtoken');
const {signup,home,logout} = require("../Controller/signupController.js");
const {signUpValidation}=require('../helpers/validation.js')
const {authentication}=require('../Middlewares/authentication.js')
router.route("/").post(signUpValidation,signup);
router.route("/home").post(authentication,home);
router.route('/logout').get(logout);
module.exports = router;