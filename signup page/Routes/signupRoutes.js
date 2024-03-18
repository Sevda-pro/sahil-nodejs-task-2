const express = require("express");
const router = express.Router();
const jwt=require('jsonwebtoken');
const {signup,home,logout,addfruits,getfruits} = require("../Controller/signupController.js");
const {signUpValidation}=require('../helpers/validation.js')
const {authentication}=require('../Middlewares/authentication.js')
router.route("/").post(signUpValidation,signup);
router.route("/home").post(authentication,home);
router.route('/logout').get(logout);
router.route("/addfruits").post(addfruits)
router.route("/fruits/:id").get(getfruits)
module.exports = router;