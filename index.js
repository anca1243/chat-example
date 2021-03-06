var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.broadcast.emit("chat message", "a user is connecting")
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
    socket.broadcast.emit("chat message", "a user is disconnecting")
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
