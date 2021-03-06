import { ui } from './ui';
import { createLayout } from './createLayout';
import { socket } from './socket';
import { goTo } from './goTo';
import { handleLoadCommit } from './handleLoadCommit';

window.onload = () => {
  var currentLink = "";
  createLayout();

  socket.on('connect',() => {
    console.log("Connected");
  });

  ui.user.userBar.onsubmit = e => {
    e.preventDefault();
    let userName = ui.user.name.value;
    socket.id = userName;
    ui.user.userBar.style.display = "none";
    ui.chat.chatBar.style.display = "-webkit-flex";
    socket.emit('nameuser', userName);
  };

  ui.chat.chatBar.onsubmit = e => {
    e.preventDefault();
    let msg = {
      id : socket.id,
      msg: ui.chat.message.value
    }
    console.log(msg);
    socket.emit('chatmessage', msg);
  };

  // Receive from any event
  socket.on('chatmessage', data => {
    console.log('from server:' + data);
    ui.chat.response.innerHTML = "<span style='color:#e0bbbb'> | " + data.id  + " : " + " " + " </span> " + data.msg;
    ui.chat.message.value = "";
  });

  socket.on('newlocation', link => {
    currentLink = link;
    if(currentLink != "" ){
      goTo(currentLink);
    }
  });

  ui.controls.locationForm.onsubmit = e => {
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
