function checkChat() {
  var domain = document.domain == 'localhost' ? document.domain : 'beta.nevercertain.com';
  ws = new WebSocket('ws://'+domain+':8080/');
  ws.onopen = function(event) {
    ws.send(userDataForChat());
  };


  var messageLogger = logMessage;
  ws.onmessage = function(event) {
    console.log(event.data);
    if(event.data == "!hello!") {
      startChat(false);
    } else if(event.data == "!hello-james!") {
      console.log('asking for it');
      if(window.webkitNotifications.checkPermission() == 0) {
        messageLogger = logMessageWithNotification;
      }

      $('#chat_send').click(function() {
        if(window.webkitNotifications.checkPermission() != 0) {
          window.webkitNotifications.requestPermission(function() {
            if(window.webkitNotifications.checkPermission() == 0) {
              messageLogger = logMessageWithNotification;
            }
          });
        }
      });
      startChat(true);
    } else if(event.data == "!bye!") {
      endChat();
    } else {
      messageLogger(event.data);
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

function logMessageWithNotification(message) {
  logMessage(message);
  if(!document.hasFocus()) {
    window.webkitNotifications.createNotification("", "Neverchat", message).show();
  }
}

function startChat(showNotifications) {
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
