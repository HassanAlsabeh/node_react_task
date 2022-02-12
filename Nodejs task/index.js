
const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const cors = require("cors");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://hassanalsabeh:Intelligent94@cluster0.xbziz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running :D" });
});

let PORT = 3001;
require('./app/routes/app.routes.js')(app);
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});