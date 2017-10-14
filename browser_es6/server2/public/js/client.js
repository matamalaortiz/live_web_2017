let socket;

socket = io.connect(); // Listen for sockets

socket.on('clients_from_server', clientsConnected);
socket.on('clients_from_server_disconnected', clientsDisconnected);

function clientsConnected(data) {
  console.log(data.size);
  let domHeading = document.getElementById('users')
  domHeading.innerHTML = data + " users connected";
}

function clientsDisconnected(data) {
  // console.log(data.size);
  let domHeading = document.getElementById('users')
  domHeading.innerHTML = data +  " users connected";
}
