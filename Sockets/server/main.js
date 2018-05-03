var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
  id: 1,
  text: "Hola soy un mensaje",
  author: "Mariano Benzo"
}];

app.use(express.static('public'));

app.get('/health-check', function(req, res) {
  res.status(200).send("OK");
});

io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('messages', messages);

  socket.on('newMessage', function(data) {
    messages.push(data);
    io.sockets.emit('messages', messages)
  });
});

server.listen(3030, function() {
  console.log("Servidor corriendo en http://localhost:3030");
});
