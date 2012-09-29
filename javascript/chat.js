function checkChat() {
  ws = new WebSocket('ws://localhost:8080/');
  ws.onopen = function(event) {
    console.log(usernameForChat());
    ws.send(usernameForChat());
  };

  ws.onmessage = function(event) {
    if(event.data == "!hello!") {
      startChat();
    } else {
      logMessage(event.data);
    }
  };

  ws.onclose = function(event) {
    $('#chat').hide();
  }
}

function usernameForChat() {
  return $.cookie('chat-user') || 'user';
}

function logMessage(message) {
  var cssClass = 'text-info';
  if(message.indexOf('user:') == 0) {
    cssClass = 'text-warning';
  }
  var messageElement = $('<h5/>');
  messageElement.attr('class',cssClass).text(message);
  console.log(messageElement);
  $('#chat_messages').append(messageElement);
}

function startChat() {
  $('#chat').show();
  $('#chat_message').focus();
}

function sendChatMessage(event) {
  event.preventDefault();
  var message = $('#chat_message').val();
  $('#chat_message').val('');
  ws.send(message);
}

$(document).ready(function() {
  checkChat();
  $('#chat_send').click(sendChatMessage);
  $('#chat_message').keypress(function(event) {
    if(event.which == 13) {
      sendChatMessage(event);
    }
  });
});
