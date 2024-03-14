const db = require('../db.js')
const User = db.users
const bcrypt = require("bcrypt");
const signup = async (req, res, next) => {
	try {
		const email = req.body.email;
		let obj = await User.findOne({ where: { email: email } });
		if (obj) {
			res.status(409).json({ msg: "email already exits", success: false });
		} else {
			const customerObject = {
				name: req.body.name,
				age: req.body.age,
				email: req.body.email,
				password: req.body.password,
			}
			let result = await User.create(customerObject);
			res.status(201).json({ success: true, msg: "user created", user: result });
		}
	} catch (error) {
		let err={
			status:400,
			error:error
		}
		next(err)
	}
};
module.exports = {signup}

// {
//     "name": "sahil brother",
//     "age": 19,
//     "email": "sahilbrother@gmail.com",
//     "password": "Passw123"
// }

