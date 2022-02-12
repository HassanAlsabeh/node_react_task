const App = require("../models/employees.model");

// Create and Save a new Employee
exports.create = (req, res) => {
  const Employee = new App({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age,
  });
  Employee
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee.",
      });
    });
};

// Retrieve all Employees from the database.
exports.findAll = (req, res) => {
  App.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employees.",
      });
    });
};

// Find a single Employees with a employeeId
exports.findOne = (req, res) => {
  App.findById(req.params.employeeId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.employeeId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.employeeId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Employee with id " + req.params.employeeId,
      });
    });
};

// Update Employee identified by the employeeId in the request
exports.update = (req, res) => {
  App.findByIdAndUpdate(
    req.params.employeeId,
    {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.employeeId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.employeeId,
        });
      }
      return res.status(500).send({
        message: "Error updating Employee with id " + req.params.employeeId,
      });
    });
};

// Delete Employee with the specified employeeId in the request
exports.delete = (req, res) => {
  App.findByIdAndRemove(req.params.employeeId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.employeeId,
        });
      }
      res.send({ message: "EMployee deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Employee not found with id " + req.params.employeeId,
        });
      }
      return res.status(500).send({
        message: "Could not delete Employee with id " + req.params.employeeId,
      });
    });
};