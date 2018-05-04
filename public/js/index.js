//client side JS

var socket = io(); //loaded in library so this method is available -- initiate request from client to server
// open up web socket and keep connection open
// store socket in variable to listen to data from server and send to server
socket.on('connect', function(){
  console.log('Connected to server'); //client prints this
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
  var li = $("<li></li>");
  li.text(`${message.from}: ${message.text}`);
  $('#messageHistory').append(li);
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function(data) {
//   //fires when acknowledgment arrives at client
//   console.log('Received acknowledgement', data);
// });

//first arg as name of custom event
//data from newEmail comes as first arg to callback
// socket.on('newEmail', function(email){
//   console.log('New email', email);
// });

$('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function() {
    //acknowledgment
  });
});
