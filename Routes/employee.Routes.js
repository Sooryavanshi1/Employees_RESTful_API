const express = require('express');
const router = express.Router();

const employeeController = require('../Controllers/employee.Controller');

router.post("/", employeeController.enterEmployeeDetails);
router.get("/",employeeController.getEmployeesBySalary);
router.get("/all",employeeController.getAllEmployees);
router.get("/:id",employeeController.getEmployeeByID);

module.exports = router;