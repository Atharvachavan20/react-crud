const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

const db = require('./db.config');

//creates a table if not created
db.sequelize.sync();

const controller = require('./Controller/employeeController');
const userController = require('./Controller/userController');

app.get("/", (req, res) => {
    return res.end("Home Page");
});

//adding Employee
app.post("/employee/new", function (req, res) {
    controller.addEmployee(req, res);
});

//Get All Employee
app.get("/employee/all", function (req, res) {
    controller.findAllEmployee(req, res);
});

//Get EmployeeBy Id
app.get("/employee/:employeeId", function (req, res) {
    controller.findEmployeeById(req, res);
});

//Update Employee
app.put("/employee/update", function (req, res) {
    controller.updateEmployee(req, res);
});

//Delete Employee
app.delete("/employee/delete/:employeeId", function (req, res) {
    controller.deleteEmployee(req, res);
});

// User registration
app.post("/user/register", userController.register);

// User login
app.post("/user/login", userController.login);

//Get All User
app.get("/user/all", function (req, res) {
    userController.findAllUsers(req, res);
});

//Get EmployeeBy Id
app.get("/user/:userId", function (req, res) {
    userController.findUserById(req, res);
});

//Update Employee
app.put("/user/update", function (req, res) {
    userController.updateUser(req, res);
});

//Delete Employee
app.delete("/user/delete/:userId", function (req, res) {
    userController.deleteUser(req, res);
});





app.listen(3001, () => {
    console.log("Server Started...");
})