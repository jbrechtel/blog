function checkChat() {
  var domain = document.domain == 'localhost' ? document.domain : 'beta.nevercertain.com';
  ws = new WebSocket('ws://beta.'+document.domain+':8080/');
  ws.onopen = function(event) {
    ws.send(userDataForChat());
  };

  ws.onmessage = function(event) {
    if(event.data == "!hello!") {
      startChat();
    } else if(event.data == "!bye!") {
      endChat();
    } else {
      logMessage(event.data);
    }
  };

  ws.onclose = function(event) {
    $('#chat').hide();
  }
}

function userDataForChat() {
  var username = $.cookie('chat-user') || 'user';
  return username+"@"+window.location;
}

function logMessage(message) {
  var cssClass = 'text-info';
  if(message.indexOf('user:') == 0) {
    cssClass = 'text-warning';
  }
  var messageElement = $('<h5/>');
  messageElement.attr('class',cssClass).text(message);
  $('#chat_messages').append(messageElement);
  $('#chat_messages').scrollTop(999999);
}

function startChat() {
  $('#chat').show();
  $('#chat_message').focus();
}

function endChat() {
  ws.close();
  $('#chat').hide();
}

function sendChatMessage(event) {
  event.preventDefault();
  var message = $('#chat_message').val();
  if(message === "") {
    return;
  }
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

  $('#chat_target').click(function(event) {
    event.preventDefault();
    $('#chat_content').toggle();
  });
});
