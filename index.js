var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var server = http.Server(app)
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
    var nickname = 'Unknown'
    socket.on('name', function(name) {
        nickname = name;
        socket.broadcast.emit('connected', nickname + ' is connected');
    });
    socket.on('disconnect', function() {
        socket.broadcast.emit('disconnected', nickname + ' is disconnected');
    });
    socket.on('chat message', function(msg) {
        io.emit('chat message', nickname + ' : ' + msg);
    });
    socket.on('typing', function(istyping) {
        if (istyping == 'yes') {
            socket.broadcast.emit('istyping', nickname + ' is typing ...');
        }
        if (istyping == 'no') {
            socket.broadcast.emit('istyping', '');
        }
    });
});

server.listen(3000, function() {
    console.log('listening on *:3000');
});