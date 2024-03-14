const express = require("express");
const router = express.Router();
const jwt=require('jsonwebtoken');
const {signup} = require("../Controller/signupController.js");
router.route("/").post(signup);

module.exports = router;