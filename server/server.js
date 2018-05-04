const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => { //special event
  console.log('New user connected'); //server prints this

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message, callback) => { //first arg is data emitted, second is acknowledgment
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server -- passed into callback and end up in client side callback');
  });

    //broadcasting
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

  socket.on('disconnect', () => {
    console.log('User disconnected from server');
  });
}); //register event listener

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
