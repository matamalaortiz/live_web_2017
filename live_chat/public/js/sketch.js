var dropzone, socket, user;
var person = prompt("Please enter your name");
var clients =[];
var clientsOnline = [];
var clientsOnlineString = clientsOnline.join(', ');
var mousePos = [];
var client = new ClientJS(); // Get info of clients.
var browser =  client.getBrowser();
var os = client.getOS();
var screenp = client.getCurrentResolution();
var mouseName = null;

function setup() {
  createCanvas(100, 100);
  dropzone = select('#dropzone');
  dropzone.dragOver(highlight);
  dropzone.dragLeave(unhighlight);
  dropzone.drop(gotFile, unhighlight);

  mouseName = document.getElementById("mouseName");
  cleanUpList();
}


// SOCKETS
socket = io.connect(); // Listen for sockets

// Receving IMG from Server
socket.on('img_from_server', newImg);
socket.on('user_from_server', userServer);

function newImg(data) { // Placing Image
  var img = createImg(data.img);
  img.addClass('imagenDropeada');
  img.style("width", data.width + '%');
  img.style("top", data.top + '%');
  img.style("left", data.left + '%');
  // img.style("display", "none");
  // console.log(data.person);
  var line1 = document.getElementById("line1");
  line1.innerHTML = data.person + " just dropped an image using " + browser + " on " + os;; // Who dropped the image?
// console.log(data.user);
}

function userServer(data) {
  var line1 = document.getElementById("dropzone");

  var line2 = document.getElementById("line2");
  var line3 = document.getElementById("line3");
  //
  // user = data;
  // console.log(data);

  // line1.innerHTML = data + " just dropped an image"; // Who dropped the image?
  // line2.innerHTML = "Using " + browser + " on " + os; // What's his/her browser and OS
  // line3.innerHTML = "current resolution is " + screenp; // What's his/her Screen Res.
}

// Receive User ID from server
socket.on('uid_from_server', userUid); // ID User
socket.on('allusers_from_server', allusers); // All Users
socket.on('mousePos_from_server', mousePos_server); // All Users

// User id, name and qty.
function userUid(data){
  var clientInfo = new Object();
  clientInfo.customId   = person; // Custom Name of the user
  clientInfo.clientId  = socket.id; // Id of the user
  // console.log(clientInfo.customId);
  clients.push(clientInfo); // Add to current users []
  socket.emit('client_info', clientInfo) // Send Users to server
  currentUsers = data;
  if (currentUsers ===  1 ) {
    document.getElementById('line3').innerHTML = 'You are alone in the room. :(';
  } else {
    document.getElementById('line3').innerHTML = 'We are ' + data + ' users in the room.'; // Qty. of Users
  }

}

function mouseMoved(data) {

  var moved = {
    move: data.isTrusted,
    person: person
  }

  socket.emit('mouse_info', moved) // Send MousePos to server
  return false;

}



function mousePos_server(data_mouse){
  var line4 = document.getElementById("line4");

  // console.log(data_mouse.move);
  var moving = data_mouse.move;
  //console.log(moving);

  if (moving === true) {
    var colors = ["blue", "aqua", "burlywood", "black"];
    var color = colors[Math.floor(Math.random()*colors.length)];


      for(i=0; i < mouseName.children.length; i++){
        //console.log(mouseName.children[i].attributes[0].value);
        if(mouseName.children[i].attributes[0].value == data_mouse.person){
          mouseName.children[i].style.color = color;
          mouseName.insertBefore(mouseName.children[i], mouseName.children[0]);

          return;
        }
      }

          var newPerson = document.createElement("li");
          newPerson.setAttribute("name", data_mouse.person);
          newPerson.innerHTML = data_mouse.person + " is moving the mouse";
          newPerson.style.color = color;
          mouseName.appendChild(newPerson);
    // line4.innerHTML = data_mouse.person + " is moving the mouse" ; // Who dropped the image?
    // line4.style.color = color;
  }
}

function cleanUpList(){
  mouseName.innerHTML = "";
  setTimeout(function(){
    cleanUpList();
  },10000);
}


// [] of all users connected
function allusers(data){
  if( !clientsOnline.includes(data.customId) ){ // if user is not in the [] include it.
    clientsOnline.push(data.customId)
    // console.log(clientsOnline);
  }
  // console.log(data.customId);
  // var userOnlinefromServer = data.customId;
  // onle
  var usersDom =document.getElementById('users');
  usersDom.innerHTML = "connected : " + clientsOnline.join(' 💧 ') ;

  // console.log(clientsOnline.length);

  // for( i = 0; i < clientsOnline.length; i++){
  //   var clientList = document.createElement('h1');
  //   clientList.setAttribute("id", "clienteOn");
  //   clientList.innerHTML = clientsOnline[i];
  //   document.getElementsByTagName('body')[0].appendChild(clientList);
  // }


}

// Imgs Dropped + Positioning Data
function gotFile(file) {
  var randomWidth = Math.floor(Math.random() * 30);
  var randomTop = Math.floor(Math.random() * 50);
  var randomLeft = 100 - randomWidth * 3;
  // console.log(randomLeft);
  // console.log('gotit');
  var data = {
    img: file.data,
    width: randomWidth,
    top: randomTop,
    left: randomLeft,
    person: person
  }


  // Send IMG to server
  socket.emit('dropped_img', data)
}

// socket.on('disconnect', function() {
//   console.log("Socket disconnected.");
//   document.title = "user disconnected"
//   socket.emit('user_disconnect', data)
//
// });

// Highlight when user is over the canvas with the IMG
function highlight() {
    dropzone.style('background-color', 'rgba(152, 47, 47, 0.67)');
}

// Unhighlight when user is over the canvas with the IMG
function unhighlight() {
    dropzone.style('background-color', 'rgba(255, 255, 255, 0)');
}
