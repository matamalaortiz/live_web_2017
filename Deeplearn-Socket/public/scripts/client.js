let socket;

socket = io.connect(); // Listen for sockets

socket.on('clients_from_server', clientsConnected);
socket.on('clients_from_server_disconnected', clientsDisconnected);
socket.on('position_from_server', positionServer);


function clientsConnected(data) {
  // console.log(data.size);
  let domHeading = document.getElementById('users')
}

function clientsDisconnected(data) {
  // console.log(data.size);
  let domHeading = document.getElementById('users')
  domHeading.innerHTML = data +  " users connected";
}

function positionServer(data) {
  console.log("Position from Server:" + " " + data);
}
