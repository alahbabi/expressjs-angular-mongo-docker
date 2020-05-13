const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('./routes/user');
const group = require('./routes/group');
const task = require('./routes/task');
const comment = require('./routes/comment');
const checkAuth = require('./middleware/check-auth')
const cors = require('cors')
const http = require('http');


var app = express();
// Database conenction
mongoose.connect('mongodb://localhost/orange').then(() => {
  console.log('Connected to Database');
}).catch((err) => {
  console.log('Not Connected to Database ERROR! ', err);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
// Pour autoriser l'accès au serveur node depuis à notre domaine que celui de node
app.use(cors());


// To Desactivate authentication : app.use('/user', user);
// To activate anthentication : app.use('/user', checkAuth, user);
app.use('/users', user);
app.use('/groups', checkAuth, group);
app.use('/tasks', checkAuth, task);
app.use('/comments', checkAuth, comment);

const server = http.createServer(app);

const sio = require('socket.io')(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Origin': req.headers.origin, //or the specific origin you want to give access to,
            'Access-Control-Allow-Credentials': true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

let broadcaster;

sio.on('connection', (socket) => {
    socket.on('JOINROOM', function (data){
      socket.join(data.roomId)
      socket.broadcast.to(data.roomId).emit('JOINROOM', {user: data.user, message: 'has joined room.'});
    })

    socket.on('LEAVEROOM', function (data){
      socket.broadcast.to(data.roomId).emit('LEAVEROOM', {user: data.user, message: 'has left this room.'});
      socket.leave(data.roomId)
    })

    socket.on('MESSAGE', function (data){
      sio.in(data.roomId).emit('MESSAGE', {user: data.user, message: data.message})
    })

    socket.on('USERTYPING', function(data){
      socket.broadcast.to(data.roomId).emit('USERTYPING', {messageTyping: data.user + ' is typing ...'});
    })

    socket.on('BROADCASTER', (data) => {
      broadcaster = socket.id;
      // SAUF L'EMETTEUR DE LA SOCKET
      socket.broadcast.emit('BROADCASTER'+data.roomId, {broadcasterId : broadcaster});
    });

    socket.on('WATCHER', (data) => {
      socket.to(broadcaster).emit('WATCHER'+data.roomId, socket.id);
    });

    socket.on('OFFER', (data) => {
      socket.to(data.id).emit('OFFER'+data.roomId, {id: socket.id, message : data.message});
    });

    socket.on('CANDIDATE', (data) => {
      socket.to(data.id).emit('CANDIDATE'+data.roomId, {id: socket.id, message : data.message});
    });
    
    socket.on('ANSWER', (data) => {
      socket.to(data.id).emit('ANSWER'+data.roomId, {id: socket.id, message : data.message});
    });
    
    socket.on('DISCONNECT', (data) => {
      socket.to(broadcaster).emit('DISCONNECT'+data.roomId, socket.id);
    });
});

server.listen(3003);


