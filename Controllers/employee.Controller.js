const mongoose = require('mongoose');
const createError = require('http-errors');

const Employee = require('../Model/employee.Model');

module.exports={
    enterEmployeeDetails:async(req,res,next)=>{
        try{
        const employee = new Employee(req.body);
        const result = await employee.save();
        res.send(result);
        }
        catch(err){
            console.log(err.message);
            if(err.name==='ValidationError'){
                next(createError(422,err.message));
                return;
            }
            next(err);
        }
    },
    getEmployeesBySalary:async(req,res,next)=>{
        try {
            const salary = req.query.employee_Salary;
            const employees = await Employee.find({employee_Salary:salary});
            if(employees.length===0){
                throw createError(404,"No Employees on this Pay Scale");
            }
            res.send(employees);
        } catch (error) {
            next(error);
        }

    },
    getAllEmployees:async(req,res,next)=>{
        try {
            const employees = await Employee.find({},{__v:0});
            if(employees.length===0){
                throw createError(404,"No Employees Found");
            }
            res.send(employees);
        } catch (error) {
            next(error);
        }
    }
}