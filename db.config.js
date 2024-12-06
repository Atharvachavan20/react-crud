const Sequelize=require('sequelize');
const dbName='employee';
const dbuser='root';
const dbpassword='Password@2024';


const sequelize=new Sequelize(dbName,dbuser,dbpassword,{
    host:'localhost',
    port:3306,
    dialect:'mysql'
});

const db={}

db.Sequelize=Sequelize
db.sequelize=sequelize

//Model Table Created here
db.employees=require('./Model/employee')(sequelize,Sequelize)
db.users = require('./Model/user')(sequelize, Sequelize); 


module.exports=db;