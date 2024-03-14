const Sequelize=require('sequelize')
require('dotenv').config()
const sequelize=new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    host:process.env.DB_HOST,
    port:3306,
    dialect:'mysql'
})
const db={}
db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.users = require("./Models/signupModel")(sequelize, Sequelize); 
db.salary = require("./Models/salaryModel")(sequelize, Sequelize); 
module.exports=db;