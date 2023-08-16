const express = require('express');
const router = express.Router();

const employeeController = require('../Controllers/employee.Controller');

router.post("/", employeeController.enterEmployeeDetails);

module.exports = router;