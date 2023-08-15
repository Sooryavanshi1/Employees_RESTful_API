const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    employee_Name:{
        type:String,
        required:true,
    },
    employee_Post:{
        type:String,
        required:true,
    },
    employee_Salary:{
        type:Number,
        required:true,
    }
});

const Employee = mongoose.model('employee',employeeSchema);

module.exports = Employee;