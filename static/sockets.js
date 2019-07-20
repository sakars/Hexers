var socket;
var socketAddress = window.location.host;

function connectSocket() {
  if (socket) {
    console.error('Socket already connected');
    return;
  }

  // Init the socket
  socket = io(socketAddress);
  socket.on('connect', function() {
    console.log('Socket established, id =', socket.id);
  });
  // Listen for events

}
function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
