const { where } = require('sequelize');
const db=require('../db.config');
const Employee=db.employees;

function addEmployee(req,res){

    if(!req.body.employeeId || !req.body.employeeName || !req.body.employeeEmail || !req.body.employeeAge){
        return res.status(400).send({
            message:"Bad Request"
        })
    }
    const employeeObject={
        employeeId:req.body.employeeId,
        employeeName:req.body.employeeName,
        employeeEmail:req.body.employeeEmail,
        employeeAge:req.body.employeeAge
    }

    Employee.create(employeeObject).then(data=>{
        res.send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })

}
function findAllEmployee(req,res){
    Employee.findAll().then(data=>{
        res.send(data);
    }).catch(error=>{
        res.status(500).send(error);    
    }) 
}

function findEmployeeById(req,res){
    Employee.findByPk(req.params.employeeId).then(data=>{
        res.send(data);
    }).catch(error=>{
        res.status(500).send(error);
    })
}
function updateEmployee(req,res){
    const newData={
        employeeId:req.body.employeeId,
        employeeName:req.body.employeeName,
        employeeEmail:req.body.employeeEmail,
        employeeAge:req.body.employeeAge
    }
    Employee.update(newData,{
        where:{employeeId:req.body.employeeId}
    }).then(()=>{
        res.send("Updated Data Successfully for EmployeeId: "+req.body.employeeId);
    }).catch(error=>{
        res.status(500).send(error);
    })
}
function deleteEmployee(req,res){
    const employeeId = req.params.employeeId; 
    Employee.destroy({
        where:{employeeId:employeeId}

    }).then(()=>{
        res.send("Deleted Data Successfully for EmployeeId: "+employeeId);
    }).catch(error=>{
        res.status(500).send(error);
    })

}

module.exports={
    addEmployee,
    findAllEmployee,
    findEmployeeById,
    updateEmployee,
    deleteEmployee
}
