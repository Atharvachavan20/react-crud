// Model/user.js
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        surname:{
            type: Sequelize.STRING,
            allowNull: false
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
            unique:true
        },
        birthdate:{
            type:Sequelize.DATE,
            allowNull:false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM('normal', 'admin'),
            allowNull: false,
            defaultValue: 'normal' // Default role is normal
        }
    });
    return User;
};