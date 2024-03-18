const con = require('../db.js')
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
const { validationResult } = require('express-validator')
const {errorhandler,successhandler}=require('./responseController.js')
const userService=require('../services/userService.js')
require('dotenv').config()
function generateAccessToken(id) {
    let x = jwt.sign({ userId: id }, process.env.secret_key);
    return x;
}
const signup = async (req, res, next) => {
	try {
		let errors = validationResult(req)
		if (!errors.isEmpty()) {
			next(errorhandler(errors.array()[0].msg,404));
		}
		const emailExists = await userService.checkEmailExistence(req.body.email, con);
        if (emailExists) {
			next(errorhandler('Email already exists',409))
        } else {
            const [insertResult,cols] = await userService.createUser(req.body, con);
			let token=generateAccessToken(insertResult.insertId);
			res.cookie('jwt',token,{
				expires:new Date(Date.now() + 60 * 60 * 1000),
				httpOnly:true
			})
            res.status(201).json(successhandler('user created',insertResult));
        }
	} catch (err) {
		next(errorhandler(err.message,500))
	}
};
const getfruits=async (req,res,next)=>{
	try{
		const id = req.params.id;
		if(!id){
			next(errorhandler('Invalid URL',400));
		}
		else{
            const insertResult = await userService.getFruitservice(id, con);
            res.status(201).json(successhandler('Data fetched',insertResult));
		}
	}catch(error){

	}
}
const addfruits=async (req,res,next)=>{
	try{
		const fruits = req.body.fruits;
		if (!fruits || !Array.isArray(fruits)) {
			next(errorhandler('Invalid input. Expected an array of fruits.',400));
		}
		else{
			const Fruits = JSON.stringify(fruits);
            const insertResult = await userService.createFruits(Fruits, con);
            res.status(201).json(successhandler('data saved',insertResult));
		}
	}catch(err){
		next(errorhandler(err.message,500))

	}
}
const home=(req,res,next)=>{
	res.send('hello from home page')
}
const logout=(req,res,next)=>{
	res.clearCookie('jwt')
}
module.exports = { signup,home,logout,addfruits,getfruits }


