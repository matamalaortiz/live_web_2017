
/*
Simple Express / Mustache / Socket.io Server Boilerplate

Alejandro Matamala
@matamalaortiz

2017
*/

// DEPENDENCIES
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const handleSocket = require('./socket');
const  mustacheExpress = require('mustache-express');


const  bodyParser = require('body-parser');
const  PORT = 80;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

// ENGINE AND PATH
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', '../views');
app.use(express.static(path.join('../public')));

// ROUTES
app.get('/', function(req, res) {
  res.render("index.mustache")
});


console.log('server running in port 7000' );

// WebSocket Portion
// WebSockets work with the HTTP server
// var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
	// We are given a websocket object in our function
	function (socket) {

		console.log("We have a new client: " + socket.id);

		// When this user emits, client side: socket.emit('otherevent',some data);
		socket.on('chatmessage', function(data) {
			console.log("Received: 'chatmessage' " + data);
			io.sockets.emit('chatmessage', data);
		});

    socket.on('nameuser', function(user) {
      console.log("user texted: " + user);
      io.sockets.emit('user', user);
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
	}
);


// SERVER OPEN IN PORT 3000
server.listen(PORT, () => {
  var port = 80;
  console.log('running at ' + port);
});
