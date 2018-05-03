//client side JS

var socket = io(); //loaded in library so this method is available -- initiate request from client to server
// open up web socket and keep connection open
// store socket in variable to listen to data from server and send to server
socket.on('connect', function(){
  console.log('Connected to server'); //client prints this

  socket.emit('createMessage', {
    from: 'Apple',
    text: 'Salutations, spacelings...'
  });
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

//first arg as name of custom event
//data from newEmail comes as first arg to callback
// socket.on('newEmail', function(email){
//   console.log('New email', email);
// });

socket.on('newMessage', function(message) {
  console.log('Got new message', message);
});
