const express = require("express");
const router = express.Router();
const jwt=require('jsonwebtoken');
const {postUsersSalary,getUsersSalary} = require("../Controller/salaryController.js");
router.route("/").post(postUsersSalary);
router.route("/all").get(getUsersSalary);


module.exports = router;