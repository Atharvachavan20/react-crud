// Controller/userController.js
const db = require('../db.config');
const User = db.users;
const bcrypt = require('bcrypt');
const user = require('../Model/user');

async function register(req, res) {
    const { email, password, name, surname, birthdate, role } = req.body;

    if (!email || !password || !name || !surname || !birthdate) {
        return res.status(400).send({ message: "All fields are required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userObject = {
        email,
        password: hashedPassword,
        name,
        surname,
        birthdate,
        role: role || 'normal' // Default to 'normal' if no role provided
    };

    User.create(userObject)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
}
async function login(req, res) {
    const { email, password } = req.body; // Removed name, surname, birthdate, role since they are not needed here

    if (!email || !password) {
        return res.status(400).send({ message: "Username and password are required." });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(404).send({ message: "User  not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).send({ message: "Invalid password." });
    }

    // Create a user object without the password
    const { password: _, ...userData } = user.dataValues; // Exclude the password from the user data

    res.send({
        message: "Login successful",
        user: userData, // Send the entire user object without the password
    });
}

function findAllUsers(req,res){
    User.findAll().then(data=>{
        res.send(data);
    }).catch(error=>{
        res.status(500).send(error);    
    }) 
}

function findUserById(req,res){
    User.findByPk(req.params.userId).then(data=>{
        res.send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}
function updateUser(req,res){
    const newData={
        userId:req.body.userId,
        name:req.body.name,
        surname:req.body.surname,
        email:req.body.email,
        birthdate:req.body.birthdate,
        password:req.body.password,
        role:req.body.role
    }
    User.update(newData,{
        where:{userId:req.body.userId}
    }).then(()=>{
        res.send("Updated Data Successfully for UserId: "+req.body.userId);
    }).catch(error=>{
        res.status(500).send(error);
    })
}
function deleteUser(req,res){
    const userId = req.params.userId; 
    User.destroy({
        where:{userId:userId}

    }).then(()=>{
        res.send("Deleted Data Successfully for User Id: "+userId);
    }).catch(error=>{
        res.status(500).send(error);
    })

}
module.exports = {
    register,
    login,
    findAllUsers,
    findUserById,
    updateUser,
    deleteUser
};