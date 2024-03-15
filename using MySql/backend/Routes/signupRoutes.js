const express = require("express");
const router = express.Router();
const jwt=require('jsonwebtoken');
const {signup} = require("../Controller/signupController.js");
const {signUpValidation}=require('../helpers/validation.js')
router.route("/").post(signUpValidation,signup);

module.exports = router;