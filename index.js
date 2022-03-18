var express = require('express');
var app = express ();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var turn = 1;

app.use(express.static(__dirname));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/connect4.html');
});

io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('movement', function(move) {
        socket.broadcast.emit('movement', move);
        console.log('movement function triggered');
    });

    socket.on('whatPlayer', function() {
        socket.emit('turnNum', turn);
        if (turn==1) {turn=2;}
        else {turn=1;}
    })

});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
