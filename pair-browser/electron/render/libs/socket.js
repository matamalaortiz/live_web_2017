import { ui } from './ui';

let socket = io.connect("http://165.227.66.228:80");

let socketConnection= () => {
  socket.on('connect',() => {
    console.log("Connected");
  });
}

let receiveMessage = () => {
  socket.on('chatmessage', data => {
    console.log('from server:' + data);
    ui.chat.response.innerHTML = "<span style='color:#e0bbbb'> | " + data.id  + " : " + " " + " </span> " + data.msg;
    ui.chat.message.value = "";
  });
}

let receiveNewUrl = () => {
  socket.on('newlocation', link => {
    currentLink = link;
    if(currentLink != "" ){
      goTo(currentLink);
    }
  });
}

let receiveUrl = () => {
  socket.on('location', input => {
    currentLink = input;
    if(currentLink != "" ){
      goTo(currentLink);
    }
  });
}

let receiveUser = () => {
  socket.on('user', data => {
    console.log(data);
  });
}

export { socket, socketConnection, receiveMessage, receiveNewUrl, receiveUrl, receiveUser }
