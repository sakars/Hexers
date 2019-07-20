var express = require('express');
var socket = require('socket.io');
var fs = require('fs');
var port = process.env.PORT || 1234;

// App setup
var app = express();
var server = app.listen(port, function() {
  console.log('Express server listening on port', port);
});
app.use(express.static('static'));
// Socket setup
var io = socket(server);
io.on('connection', function(socket) {//create user connection
  console.log('Connection established, id=', socket.id);
  console.log('Connection data', socket.handshake.query);
  var initData = socket.handshake.query.initData ? JSON.parse(socket.handshake.query.initData) : null;
  //var connectedSockets = io.sockets.sockets;

  socket.on('disconnect', function(reason) {//user disconnection handler
    console.log('Disconnect from', socket.id, '; reason =', reason);
    socket.broadcast.emit('leave',JSON.stringify( {id: socket.id} )); // Send to every open socket, excluding the sender

  });
});
const nsp = io.of('/moderator');
nsp.on('connection', function(socket){
  console.log('someone connected');
});
class User {
  constructor() {

  }
}
class ServerStorage{
  constructor(){
    this.users={};

  }
}
var storage=new ServerStorage();
//fs.readFileSync("static/game/config.json","utf8") example of file reading
