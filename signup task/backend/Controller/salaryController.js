const db = require('../db.js')
const User = db.users;
const Salary = db.salary;

const postUsersSalary = async (req, res) => {
    try {
        const email = req.body.email;
        let obj = await User.findOne({ where: { email: email } });
        if (obj) {
            let obj1 = {
                email: req.body.email,
                salary: req.body.salary
            }
           let result= await Salary.create(obj1);
            res.status(200).json({msg:'salary added', result:result})
        } else{
            throw new Error('Email not registered');
        }
    }
    catch (error) {
        let err={
			status:401,
			error:error
		}
		next(err)
    }
}

const getUsersSalary = async (req, res) => {
    try {
        const users = await Salary.findAll({
            order: [['salary', 'DESC']]
        })

        res.status(200).json(users)
    }
    catch (error) {
        let err={
			status:500,
			error:error
		}
		next(err)
    }

}
module.exports = { postUsersSalary, getUsersSalary };