const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user = require('./routes/user');
const group = require('./routes/group');
const task = require('./routes/task');
const comment = require('./routes/comment');
const checkAuth = require('./middleware/check-auth')
const cors = require('cors')


var app = express();
// Database conenction
mongoose.connect("mongodb://localhost/orange").then(() => {
  console.log("Connected to Database");
}).catch((err) => {
  console.log("Not Connected to Database ERROR! ", err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
// Pour autoriser l'accès au serveur node depuis à notre domaine que celui de node
app.use(cors());

// To Desactivate authentication : app.use("/user", user);
// To activate anthentication : app.use("/user", checkAuth, user);
app.use("/users", user);
app.use("/groups", checkAuth, group);
app.use("/tasks", checkAuth, task);
app.use("/comments", checkAuth, comment);

// Starting application
app.listen(3003 , () => {
  console.log("Listening at : 3003");
});
