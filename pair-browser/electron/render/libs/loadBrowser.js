import { ui } from './ui';
import { createLayout } from './createLayout';
import { socket }  from './socket';
import * as Socket from './socket';
import * as Peer from './peer';
import { goTo } from './goTo';
import { handleLoadCommit } from './handleLoadCommit';

let loadBrowser =  window.onload = () => {
  var userName;
  var currentLink = "";
  createLayout();

  Peer.events(); //
  Socket.socketConnection(); // Connection web sockets

  // Submit User Name
  ui.user.userBar.onsubmit = e => {
    e.preventDefault();
    userName = ui.user.name.value;
    let user  = {
      peerID: Peer.peerID,
      socketID: socket.id,
      userNAME: userName,
    }
    ui.user.userBar.style.display = "none";
    ui.chat.chatBar.style.display = "-webkit-flex";
    socket.emit('nameuser', user);
  };

  // Sumbmit Message to Chat
  ui.chat.chatBar.onsubmit = e => {
    e.preventDefault();
    let msg = {
      id : userName,
      msg: ui.chat.message.value
    }
    console.log(msg);
    socket.emit('chatmessage', msg);
  };

  // Submit New Uel
  ui.controls.locationForm.onsubmit = e => {
    e.preventDefault();
    let locInput = ui.controls.location.value;
    let http = "http://";
    if(locInput.startsWith('http') != true){
      locInput = http.concat(locInput);
      socket.emit('location', locInput);
    } else {
      socket.emit('location', locInput);
    }
  };

  Socket.receiveMessage(); // Receive Message from Chat.
  Socket.receiveNewUrl(); // Receive New Url
  Socket.receiveUrl(); // Receive Url
  Socket.receiveUser(); // Receive User

  ui.webview.webview.addEventListener('did-finish-load', handleLoadCommit);

};


export { loadBrowser }
