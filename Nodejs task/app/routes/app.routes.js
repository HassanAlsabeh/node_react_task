module.exports = (app) => {
    const App = require("../controllers/app.controller.js");
  
    app.post("/create", App.create);
  
    app.get("/get_all", App.findAll);
  
    app.get("/employee/:employeeId", App.findOne);
  
    app.put("/employee/:employeeId", App.update);
  
    app.delete("/employee/:employeeId", App.delete);
  };