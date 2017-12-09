"use strict";

let socket;
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
  var urls = ["https://firebasestorage.googleapis.com/v0/b/neat-vista-141916.appspot.com/o/teach1.mp4?alt=media&token=ac853088-a89e-43c6-8dda-ccc72d0f8156","/videos/teach1.mp4", "/videos/teach2.mp4", "/videos/teach2.mp4"];


  let video = document.getElementById('my-video');
  let videoShow = document.getElementById('video');
  let videoTeach = document.createElement("video");
  document.body.appendChild(videoTeach);
  videoTeach.setAttribute("width", "227");
  videoTeach.setAttribute("height", "227");
  videoTeach.setAttribute("loop", "loop");
  videoTeach.setAttribute("id", "tranning");
  videoTeach.setAttribute("autoplay", "autoplay");





loopURls();

function train(url, data, i,  callback) {
  console.log("training");
  console.log("PLAY");

  setInterval(function() {
    knn.addImage(videoTeach, data);
    times++
    if (times > 6 ) {
      console.log("times > 6");
      // clearInterval( intervalOne );
      times = 0;
      callback();
    }
  }, 5000 )
}

function changeVideo(i){

  console.log("changing video to: " + urls[i]);
  videoTeach.src = urls[0];
  videoTeach.load();

  console.log(videoTeach);
  train(urls[i], i, i,loopURls)
  console.log("2 segs");

}

function loopURls(){
  console.log("running loop");
  for (var i = 0; i < urls.length; i++){
    console.log("i es:" +i);
    changeVideo(i);
    console.log("i es:" +i);
  }

}



function stopInterval(interval) {
  setTimeout(function( ) {
    console.log("stop trainning: " + data);
    clearInterval( interval );
  }, 1000);
}

  // Trainning with keyboard
  window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   // Training Self Video
   if (key == 65) {
     console.log("preesed");
     videoTeach.src = "/videos/teach1.mp4";
     videoTeach.play()
  var intervalOne = setInterval(function() {
    knn.addImage(videoTeach, 1);
       // knn.addImage(video, 1);
  }, 2000 )

      times++;
   }else if (key == 83){
   console.log("preesed 2");
   videoTeach.src = "/videos/teach2.mp4";
   setInterval(function() {
     knn.addImage(videoTeach, 2);
        // knn.addImage(video, 1);
   }, 2000 )

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
    console.log("corriendo");

    if (times > 0) {
      knn.predict(video, function(data) {
        console.log(data.classIndex);
        if (data.classIndex == 1) {
          // console.log('Position 01');
          let position = 1;
			    socket.emit('position', position);
        } else if (data.classIndex == 2) {
          // console.log('Position 02');
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
  // console.log("Position from Server:" + " " + data);
}
