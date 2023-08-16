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
    }
}