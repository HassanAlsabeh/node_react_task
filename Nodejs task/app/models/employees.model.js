const mongoose = require("mongoose");

const allEmployeeSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  age: String,
});

module.exports = mongoose.model("allEmployee", allEmployeeSchema);
