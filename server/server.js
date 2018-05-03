const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => { //special event
  console.log('New user connected'); //server prints this

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
  });

  socket.emit('newMessage', {
    from: 'Banana',
    text: 'Greetings, earthlings...',
    createdAt: 123
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from server');
  });
}); //register event listener

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
