const con = require('../db.js')
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator')
const signup = async (req, res, next) => {
	try {
		let errors = validationResult(req)
		if (!errors.isEmpty()) {
			console.log(errors)
			const err = new Error(`something missing`);
			err.status = 'fail';
			err.statuscode = 404;
			next(err);
		}

		const { email, name, age, password } = req.body;
		const checkEmailQuery = `SELECT * FROM signup WHERE email = '${email}'`;
		con.query(checkEmailQuery, async (error, result) => {
			if (error) {
				const err = new Error(error);
				err.status = 'fail';
				err.statuscode = 404;
				next(err)
			}

			if (result.length) {
				const err = new Error('Email already exists');
				err.status = 'fail';
				err.statusCode = 409;
				next(err)
			} else {
				const hashedPassword = await bcrypt.hash(password, 10);
				const insertQuery = `INSERT INTO signup (name, age, email, password) VALUES ('${name}', ${age}, '${email}', '${hashedPassword}')`;
				con.query(insertQuery, (error, result) => {
					if (error) {
						const err = new Error(error);
						err.status = 'fail';
						err.statuscode = 404;
						next(err)
					}
					res.status(201).json({ success: true, message: "User created", user: result });
				});
			}
		})
	} catch (err) {
		next(err)
	}
};
module.exports = { signup }

// {
//     "name": "sahil brother",
//     "age": 19,
//     "email": "sahilbrother@gmail.com",
//     "password": "Passw123"
// }

