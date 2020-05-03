const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const user = require('./routes/user');
const group = require('./routes/group');
const task = require('./routes/task');
const comment = require('./routes/comment');
const checkAuth = require('./middleware/check-auth')
const cors = require('cors')
const http = require('http');


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

const server = http.createServer(app);

const sio = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

sio.on("connection", (socket) => {
    socket.on('join', function (data){
      socket.join(data.room)
      console.log(data.user + ' joined the room : ' + data.room );
      socket.broadcast.to(data.room).emit('new user joined', {user: data.user, message: 'has joined room.'});
    })

    socket.on('leave', function (data){
      console.log(data.user + ' left the room : ' + data.room );
      socket.broadcast.to(data.room).emit('user left room', {user: data.user, message: 'has left this room.'});
      socket.leave(data.room)
    })

    socket.on('message', function (data){
      sio.in(data.room).emit('new message', {user: data.user, message: data.message})
    })
});

server.listen(3003);


