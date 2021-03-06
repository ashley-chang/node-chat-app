//client side JS

var socket = io(); //loaded in library so this method is available -- initiate request from client to server
// open up web socket and keep connection open
// store socket in variable to listen to data from server and send to server

function scrollToBottom () { //called every time new message added to chat area
  // selectors
  var messages = $('#messageHistory');
  var newMessage = messages.children('li:last-child');

  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight(); //takes padding into account
  var lastMessageHeight = newMessage.prev().innerHeight();


  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight); //set scrollTop value
  }
}


socket.on('connect', function(){
  console.log('Connected to server'); //client prints this
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('Join successful');
    }
  });
});

socket.on('updateUserList', function(users) {
  console.log(users);
  var ol = $('<ol></ol>');
  users.forEach(function(user) {
    ol.append($('<li></li>').text(user));
  });

  $('#users').html(ol);
});

socket.on('newMessage', function(message) {
  var template = $('#message-template').html(); //returns template code
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#messageHistory').append(html);
  scrollToBottom();

  // var li = $("<li></li>");
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // $('#messageHistory').append(li);
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

socket.on('newLocationMessage', function (message) {
  var template = $('#location-message-template').html();
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  $('#messageHistory').append(html);
  scrollToBottom();
});

$('#message-form').on('submit', function(e){
  e.preventDefault();
  var messageTextbox = $('[name=message]');
  socket.emit('createMessage', {
    text: messageTextbox.val()
  }, function() {
    //acknowledgment - request received by server
    messageTextbox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function(){
  if (!navigator.geolocation) { //if there is no geolocation object on navigator
    return alert('Geolocation is not supported by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  //fetch user's position
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(err) {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location!');
  });
});
