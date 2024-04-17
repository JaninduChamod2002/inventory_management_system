const express = require('express');
const  {Employee}  = require('../Models/Employee.js');

const router = express.Router();

// Route for Save a new Employee
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.EmpID ||
      !request.body.employeeName ||
      !request.body.phone ||
      !request.body.role ||
      !request.body.password ||
      !request.body.passwordConfirm

    ) {
      return response.status(400).send({
        message: 'Send all required fields: EmpID, employeeName, DOB, NIC, Address, Position, ContactNo,Email',
      });
    }
    const newEmployee = {
      EmpID: request.body.EmpID,
      employeeName: request.body.employeeName,
      phone: request.body.phone,
      role: request.body.role,
      password: request.body.password,
      passwordConfirm: request.body.passwordConfirm,
    };

    const employee = await Employee.create(newEmployee);

    return response.status(201).send(employee);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Employees from database
router.get('/', async (request, response) => {
  try {
    const employees = await Employee.find({});

    return response.status(200).json({
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Employee from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const employee = await Employee.findById(id);

    return response.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update an employee
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.EmpID ||
      !request.body.employeeName ||
      !request.body.phone ||
      !request.body.role ||
      !request.body.password ||
      !request.body.passwordConfirm 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: EmpID, employeeName, DOB, NIC, Address, Position, Salary',
      });
    }

    const { id } = request.params;

    const result = await Employee.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Employee not found' });
    }

    return response.status(200).send({ message: 'Employee updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete an employee
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Employee.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Employee not found' });
    }

    return response.status(200).send({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// GET route for retrieving employees based on search criteria, pagination, and sorting
router.get("/searchEmployee", async (req, res) => {
  try {
    // Destructuring the request query with default values
    const { page = 1, limit = 8, search = "", sort = "EmpID" } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    // Regular expression for case-insensitive search
    const query = {
      $or: [
        { EmpID: { $regex: new RegExp(search, 'i') } }, // Using RegExp instead of directly passing $regex
        { employeeName: { $regex: new RegExp(search, 'i') } },
        { role: { $regex: new RegExp(search, 'i') } },
        { phone: { $regex: new RegExp(search, 'i') } },
       
      ],
    };
    // Using await to ensure that sorting and pagination are applied correctly
    const employees = await Employee.find(query)
      .sort({ [sort]: 1 }) // Sorting based on the specified field
      .skip(skip)
      .limit(parseInt(limit));
    res.status(200).json({ count: employees.length, data: employees });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// Route for employee Login
router.post('/eLogin', async (request, response) => {
  try {
      const { phone, password } = request.body;
      if (!phone || !password) {
          return response.status(400).json({ message: 'phone and password are required' });
      }
      const employee = await Employee.findOne({ phone });
      if (!employee) {
          return response.status(404).json({ message: 'User not found' });
      }
      if (password !== employee.password) {
          return response.status(401).json({ message: 'Incorrect password' });
      }
      response.status(200).json(employee);
  } catch (error) {
      console.error(error.message);
      response.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
