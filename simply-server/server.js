const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
const config = require("config")

var app = express();
// Database connection
mongoose.connect(config.get('mongodb.connectionString'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(cors());

// Starting application
app.listen(3003 , () => {
  console.log("Listening at : 3003");
});
