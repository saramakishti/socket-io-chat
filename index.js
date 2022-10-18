const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

// Set up a server
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user is connected');
  io.emit('chat message', 'Welcome to Socket IO chat! New user joined.');
  // console.log(socket);

  // Action happening while connection is opened
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on port 3000');
});
