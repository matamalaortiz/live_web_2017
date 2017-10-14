import { ui } from './ui';
import { createLayout } from './createLayout';
import { socket } from './socket';
import { goTo } from './goTo';
import { handleLoadCommit } from './handleLoadCommit';

let loadBrowser = onload = function() {
  var currentLink = "";
  createLayout();

  socket.on('connect', function() {
    console.log("Connected");
  });

  ui.chat.chatBar.onsubmit = function(e) {
    e.preventDefault();
    let msg = ui.chat.message.value;
    console.log(msg);
    socket.emit('chatmessage', msg);
  };

  // Receive from any event
  socket.on('chatmessage', function (data) {
    console.log('from server:' + data);
    ui.chat.response.innerHTML = "<span style='color:#e0bbbb'> | " + socket.id  + " : " + " " + " </span> " + data;
    ui.chat.message.value = ""

  });


  socket.on('newlocation', function (link) {
    currentLink = link;
    if(currentLink != "" ){
      goTo(currentLink);
    }
  });


  ui.controls.locationForm.onsubmit = function(e) {
    e.preventDefault();
    let locInput = ui.controls.location.value;
    socket.emit('location', locInput);
  };

  socket.on('location', function (input) {
    currentLink = input;
    if(currentLink != "" ){
      goTo(currentLink);
    }
  });

   ui.webview.webview.addEventListener('did-finish-load', handleLoadCommit);
};


export { loadBrowser }
