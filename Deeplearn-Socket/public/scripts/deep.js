var mypeerid = null;
var peer = null;
var connection = null;
let startPredicting = false;
let times = 0;
let y = 0;




document.addEventListener('DOMContentLoaded', function() {

  let video = document.getElementById('my-video');
  let videoShow = document.getElementById('video');
  let still = document.getElementById('still');
  let up = document.getElementById('up');
  let down = document.getElementById('down');
  let predict = document.getElementById('predict');


  window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   // Training Self Video
   if (key == 65) {
     knn.addImage(video, 1);
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
// let knnRemote = new p5ml.KNNImageClassifier(modelLoaded);


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
        }

      });

    }
  }, 1500);


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
