var socket = io.connect('http://localhost:8080', { 'forceNew': true });

socket.on('messages', function(data) {
  console.log(data);
  render(data);
});

function render(data) {
  var html = data.map(function(message, index) {
    return(`<div>
              <strong>${message.author}</strong>:
              <em>${message.text}</em>
            </div>`);
  }).join(" ");


  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
  var payload = {
    author: document.getElementById('userName').value,
    text: document.getElementById('text').value
  };

  socket.emit('newMessage', payload);
  return false;
}
