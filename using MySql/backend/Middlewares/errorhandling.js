const db = require('../db.js')
const User = db.users;
const fs=require('fs');
const errorhandling = (err, req, res, next) => {
	const statusCode = err.statuscode || 500;
	res.status(statusCode).json({ message: err.message, success: err.status })
};

module.exports = { errorhandling };