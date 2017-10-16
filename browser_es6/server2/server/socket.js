var clients = new Set();

module.exports = socket => {

  var qtyOfClients = Array.from(clients).length;

  (() => {
    clients.add(socket.id);
    // console.log(`New client: ${socket.id}, Qty of clients: ${ Array.from(clients).length}`);
    socket.emit('clients_from_server', qtyOfClients);
    socket.broadcast.emit('clients_from_server', qtyOfClients);

  })();

  socket.on('disconnect', () => {
  console.log(`Client ${socket.id} has disconnected`);

    try {
      delete
      clients.delete(socket.id);
      // console.log(`Qty of clients: ${ Array.from(clients).length}`);
      // console.log(Array.from(clients).length);
      socket.emit('clients_from_disconnected', qtyOfClients);
      socket.broadcast.emit('clients_from_server_disconnected', qtyOfClients);

    } catch (error) {
      console.log('Users could not be deleted.');
    }

  });


	console.log("We have a new client: " + socket.id);

	// When this user emits, client side: socket.emit('otherevent',some data);
	socket.on('chatmessage', function(data) {
		console.log("Received: 'chatmessage' " + data);
		io.sockets.emit('chatmessage', data);
	});

	socket.on('location', function(data) {
		console.log("Received: location " + data);
		io.sockets.emit('location', data);
	});

	socket.on('newlocation', function(data) {
		console.log("Received: new location " + data);
		io.sockets.emit('newlocation', data);
	});

	socket.on('disconnect', function() {
		console.log("Client has disconnected " + socket.id);
	});

  socket.on('user', function(userServer){
    console.log("Client has connected " + userServer);
  });



};
