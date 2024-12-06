    module.exports=(sequelize,Sequelize)=>{
        const employees =sequelize.define('employee',{
            employeeId:{
                type:Sequelize.INTEGER,
                primaryKey:true
            },
            employeeName:{
                type:Sequelize.STRING
            },
            employeeEmail:{
                type:Sequelize.STRING
            },
            employeeAge:{
                type:Sequelize.INTEGER
            },

        });
        return employees;
    }