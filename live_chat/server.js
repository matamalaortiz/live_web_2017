// DEPENDENCIES & GLOBAL VARIABLES
var express = require('express');
var path = require('path');
var mustacheExpress = require('mustache-express');

var app = express();

var http = require('http');
http = http.Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
var port = 3000;
var currentUser, allusers;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

// ENGINE AND PATH
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.get('/', function(req, res) {
  res.render("index.mustache")
});

//SOCKETS
io.on('connection', function(socket) { // OPEN CONNECTION
  console.log('new client connected');
	// console.log(socket.id);

	// RECEIVE INFO
	socket.on('dropped_img', gotImg); // Receive IMG from Client
	socket.on('client_info', clientInfo); // Receive Client Info from Client
	socket.on('mouse_info', moved); // Receive Client Info from Client
	// socket.on('user_disconnected', userDisconnected); // Receive Client Info from Client
  //
	// function userDisconnected(data){
	// 	console.log(data);
	// }

	function gotImg(data) {
	  io.sockets.emit('img_from_server', data);
	  // io.sockets.emit('img', data) // Send img to client
	  io.sockets.emit('user_from_server', currentUser) // Send info client who dropped the image
	  // console.log(data)
	}

	function clientInfo(data) {
	  currentUser = data.customId;
	  allusers = data;
		// console.log(data.customId);
	  io.sockets.emit('allusers_from_server', allusers); // Send All users to Client.
	};

	function moved(data) {
		// console.log (data.move)
		io.sockets.emit('mousePos_from_server', data); // Send MousePos to Client.

	}



	// EMIT INFO
	io.sockets.emit('uid_from_server', Object.keys(io.sockets.connected).length); // Send Quantity of users connected

	// USER DICONNECT
	socket.on('disconnect', function() {
		io.sockets.emit('uid_from_server', Object.keys(io.sockets.connected).length); // Send new length of users connected
		console.log(Object.keys(io.sockets.connected).length);
	});

});

// SERVER OPEN IN PORT 3000

var server = http.listen(port, function() {
  console.log("I am listening on port " + port)
});
