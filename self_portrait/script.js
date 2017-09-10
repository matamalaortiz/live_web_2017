(function() {


  var width = 320;
  var height = 0;

  var streaming = false;


  var video = null;
  var canvas = null;
  var photo = null;
  var data;
  var database = firebase.database();
  var childKey;
  var childData;
  var childDataImage;

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');

    navigator.getMedia = (navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

    navigator.getMedia({
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );

    video.addEventListener('canplay', function(ev) {
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth / width);

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    clearphoto();
  }


  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    // photo.setAttribute('src', data);
  }


  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      data = canvas.toDataURL('image/png');
      //console.log(data);

    } else {
      clearphoto();
    }
  }

  function storephoto() {

    var img = data.replace(/data:image\/(png|jpeg|jpg|gif);base64,/, '');
    var date = Date.now();
    var storageRef = firebase.storage().ref("snapshots/" + date + ".png");
    var imageLink = "https://firebasestorage.googleapis.com/v0/b/self-a0c85.appspot.com/o/snapshots%2F" + date + ".png?alt=media&token=dfe5a630-9860-4981-9342-62a505e76696";
    var metadata = {
      contentType: 'image/png',
    };

    firebase.database().ref('images').push({
      image: imageLink
    });
    var task = storageRef.putString(img, 'base64', metadata).then(function(snapshot) {
      console.log('Uploaded a base64 string!');
      // console.log(storageRef);
    });
  }

  window.addEventListener('load', startup, false);

  setTimeout(function() {
    document.body.style.backgroundColor = "black";
    loadImages();
    takepicture();
    video.style.display = "none";
    storephoto();
  }, 500);

  var photos = [];

  function loadImages() {
    database.ref('images').once('value', function(snapshot) {
      console.log(snapshot)
      snapshot.forEach(function(childSnapshot) {
        childKey = childSnapshot.key;
        childData = childSnapshot.val();
        childDataImage = childData.image;
        photos.unshift(childData.image)
      });
      console.log(photos.length)
      console.log(photos[100])
      photos.forEach(function(e, i) {
        var photoNow = document.createElement('img');
        photoNow.setAttribute('src', e);
        document.getElementsByTagName('body')[0].appendChild(photoNow);
      })
    });

  }

})();
