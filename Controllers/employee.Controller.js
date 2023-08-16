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
    },
    getEmployeeByID:async(req,res,next)=>{
        try{
            const id = req.params.id;
            const employee = await Employee.findById(id,{__v:0});
            if(!employee){
                throw createError(404,"No Employee By this Id");
            }
            res.send(employee)
        }catch(error){
            if(error instanceof mongoose.CastError){
                next(createError(400,"Invalid ID"));
                return;
            }
            next(error);
        }
    },
    updateEmployeeSalaryByID:async(req,res,next)=>{
        try{
        const id = req.params.id;
        const salary = req.body.employee_Salary;
        const updates =  req.body;
        const options = {new:true};

        const employee = Employee.findById(id);
        if(!salary){
            throw createError(422,"Please provide an amount");
        }
        const updatedResults = await Employee.findByIdAndUpdate(id,updates,options);
        if(!updatedResults){
            throw createError(404,"Employee Can't be found");
        }
        res.send(updatedResults);
    }catch(error){
        if(error instanceof mongoose.CastError){
            next(createError(400,"Invalid ID"));
            return;
        }
        next(error);
    }
    },
    updatePostOfAll:async(req,res,next)=>{
        try{
        const post = req.query.employee_Post;
        const newPost = req.body.employee_Post;
        const updates = req.body;
        const options = {new:true};
        var employees = await Employee.find({employee_Post:post});
        const results = await Employee.updateMany({employee_Post:post},updates);
            if(results.modifiedCount===0){
                throw createError(404,"No such post present");
            }
        employees = await Employee.find({employee_Post:newPost});
        res.send(employees);
        }catch(error){
            next(error);
        }
    }
}