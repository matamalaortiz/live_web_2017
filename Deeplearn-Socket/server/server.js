
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
const  PORT = process.env.PORT || 3000;

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

io.sockets.on('connection',
	// We are given a websocket object in our function
	function (socket) {

		console.log("We have a new client: " + socket.id);

		// When this user emits, client side: socket.emit('otherevent',some data);
		socket.on('position', function(data) {
			console.log("Received: 'position' " + data);
			io.sockets.emit('position_from_server', data);
		});

    socket.on('buttonPressed', function(data) {
      console.log("From Controllet: 'Button Presser : ' " + data);
      io.sockets.emit('controllerr_from_server', data);
    });

	}
);



// SERVER OPEN IN PORT 3000
server.listen(PORT, () => {
  let port = server.address().port;
  console.log('running at ' + port);
});