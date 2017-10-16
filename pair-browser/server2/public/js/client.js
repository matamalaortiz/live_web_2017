let socket;

let $svg = $('svg').drawsvg();

$svg.drawsvg('animate');
socket = io.connect(); // Listen for sockets

socket.on('clients_from_server', clientsConnected);
socket.on('clients_from_server_disconnected', clientsDisconnected);
socket.on('user', userServer);

function userServer(data) {
  document.getElementById('user').innerText = "Welcome " + data;
}

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
