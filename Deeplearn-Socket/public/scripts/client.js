"use strict";

let socket;
var mypeerid = null;
var peer = null;
var connection = null;
let startPredicting = false;
let times = 0;
let y = 0;

// socket = io.connect("https://am7673.itp.io:3000/"); // Listen for sockets
socket = io.connect(); // Listen for sockets

document.addEventListener('DOMContentLoaded', function() {

  socket.on('clients_from_server', clientsConnected);
  socket.on('clients_from_server_disconnected', clientsDisconnected);
  socket.on('position_from_server', positionServer);
  socket.on('controller_from_server', controllerServer);


  let video = document.getElementById('my-video');
  let videoShow = document.getElementById('video');

  // Trainning with keyboard
  window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   // Training Self Video
   if (key == 65) {
     knn.addImage(video, 1);
     var frame = captureVideoFrame('image', 'jpg');
      times++;
   }else if (key == 83) {
     knn.addImage(video, 2);
     times++;
   } else if (key == 68) {
     knn.addImage(video, 3);
     times++;
   }else if (key == 70) {
     knn.addImage(video, 4);
     times++;
   } else if (key == 71) {
     knn.addImage(video, 5);
     times++;
   }

}

let knn = new p5ml.KNNImageClassifier(modelLoaded);

  setInterval(function() {
    if (times > 10) {
      knn.predict(video, function(data) {
        if (data.classIndex == 1) {
          console.log('Position 01');
          let position = 1;
			    socket.emit('position', position);
        } else if (data.classIndex == 2) {
          console.log('Position 02');
          let position = 2;
          socket.emit('position', position);
        } else if (data.classIndex == 3) {
          console.log('Position 03');
          let position = 3;
          socket.emit('position', position);
        } else if (data.classIndex == 4) {
          console.log('Position 04');
          let position = 4;
          socket.emit('position', position);
        } else if (data.classIndex == 5) {
          console.log('Position 05');
          let position = 5;
          socket.emit('position', position);
        } else if (data.classIndex == 6) {
          console.log('Position 06');
          let position = 6;
          socket.emit('position', position);
        }

      });

    }
  }, 1500);


  // Laarning from control remote
  function controllerServer(data) {
    console.log("Controller Pressed " + data);

    if (data == "1") {
      knn.addImage(video, 1);
      times++;
    }else if (data == "2") {
      knn.addImage(video, 2);
      times++;
    } else if (data == "3") {
      knn.addImage(video, 3);
      times++;
    }else if (data == "4") {
      knn.addImage(video, 4);
      times++;
    } else if (data == "5") {
      knn.addImage(video, 5);
      times++;
    } else if (data == "6") {
      knn.addImage(video, 6);
      times++;
    }

  }

  navigator.getUserMedia = navigator.getUserMedia;

  if (navigator.getUserMedia) {
    navigator.getUserMedia({ audio: false, video: true },
      function(stream) {
        video.srcObject = stream;
        videoShow.srcObject = stream;

        video.onloadedmetadata = function(e) {
          video.play();
          videoShow.play();

        };
      },
      function(err) {
        console.log("The following error occurred: " + err.name);
      }
    );
  } else {
    console.log("getUserMedia not supported");
  }
})

function modelLoaded() {
  console.log('Model Loaded')
}




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
