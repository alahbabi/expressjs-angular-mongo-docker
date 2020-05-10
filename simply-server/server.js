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
      socket.join(data.room)
      socket.broadcast.to(data.room).emit('JOINROOM', {user: data.user, message: 'has joined room.'});
    })

    socket.on('LEAVEROOM', function (data){
      socket.broadcast.to(data.room).emit('LEAVEROOM', {user: data.user, message: 'has left this room.'});
      socket.leave(data.room)
    })

    socket.on('MESSAGE', function (data){
      sio.in(data.room).emit('MESSAGE', {user: data.user, message: data.message})
    })

    socket.on('USERTYPING', function(data){
      socket.broadcast.to(data.room).emit('USERTYPING', {messageTyping: data.user + ' is typing ...'});
    })

    socket.on('BROADCASTER', () => {
      broadcaster = socket.id;
      // SAUF L'EMETTEUR DE LA SOCKET
      socket.broadcast.emit('BROADCASTER', {broadcasterId : broadcaster});
    });

    socket.on('WATCHER', () => {
      socket.to(broadcaster).emit('WATCHER', socket.id);
    });

    socket.on('OFFER', (data) => {
      socket.to(data.id).emit('OFFER', {id: socket.id, message : data.message});
    });

    socket.on('CANDIDATE', (data) => {
      socket.to(data.id).emit('CANDIDATE', {id: socket.id, message : data.message});
    });
    
    socket.on('ANSWER', (data) => {
      socket.to(data.id).emit('ANSWER', {id: socket.id, message : data.message});
    });
    
    socket.on('DISCONNECT', () => {
      socket.to(broadcaster).emit('DISCONNECT', socket.id);
    });
});

server.listen(3003);


