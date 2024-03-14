const db = require('../db.js')
const User = db.users;

const errorhandling = (err,req, res, next) => {
	res.status(err.status).send(err)
};

module.exports = { errorhandling };