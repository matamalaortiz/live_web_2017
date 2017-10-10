const { ipcRenderer } = require('electron')
const media = require('./js/media.js')
const ui = require('./js/ui.js')
const k = require('./js/keys.js')

var peer = new Peer({ key: k.app.peer});

peer.on('open', function(){
  ui.users.my_id.innerText= peer.id;
});

// Receiving a call
peer.on('call', function(call){
  let con = confirm("Someone is calling you!");
  if (con == true) {
    call.answer(window.localStream);
    callPeer(call);
  } else {
    // send response
  }
});

peer.on('error', function(err){
  alert(err.message);
  hideAndShowDomElements();
});

// handlers
window.onload = evt => {

  ui.buttons.make_call.addEventListener('click', function (e) {
    var call = peer.call(ui.users.call_id.value, window.localStream);
    callPeer(call);
  })

  ui.buttons.end_call.addEventListener('click', function (e) {
    window.existingCall.close();
    hideAndShowDomElements();
  });

  // Start
  getMedia();
}

function getMedia () {
  ui.containers.their_video.style.display = "none"

  navigator.getUserMedia({audio: true, video: true}, function(stream){
    ui.containers.my_video.setAttribute('src', URL.createObjectURL(stream));
    window.localStream = stream;
    hideAndShowDomElements();
  }, function(){ ui.containers.media_error.style.display = 'block';});
}

function hideAndShowDomElements () {
    ui.containers.media_container.style.display = 'none';
    ui.containers.call_container.style.display = 'none';
    ui.containers.info_peer.style.display = 'block';
}

function callPeer (call) {
    // Hang up on an existing call if present
    if (window.existingCall) {
      window.existingCall.close();
    }

  // Wait for stream on the call, then set peer video display
  call.on('stream', function(stream){
    ui.containers.their_video.style.display = "block"
    ui.containers.their_video.setAttribute('src', URL.createObjectURL(stream) )
  });

  // UI stuff
  window.existingCall = call;
  ui.users.their_id.innerHTML = call.peer;

  call.on('close', hideAndShowDomElements);
    ui.containers.media_container.style.display = 'none';
    ui.containers.info_peer.style.display = 'none';
    ui.containers.call_container.style.display = 'block';
}


// IPS to main.js
ui.buttons.quit.addEventListener('click', function (e) {
  ipcRenderer.send('closing')
})
