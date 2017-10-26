import { loadBrowser } from './loadBrowser';
import { socket } from './socket';
import { ui } from './ui';
import Peer from 'simple-peer';

let peer = new Peer({
  initiator: true,
  trickle: false
})

let events = () => {

  peer.on('signal', data => {
     console.log(peerConnected)
     let user  = {
       peerId: JSON.stringify(data),
       socket: socket.id,
       username: userName,
     }
     socket.emit("userInfo", user);
     let opt = document.createElement('option');
     opt.value = JSON.stringify(data);
     opt.innerHTML = socket.id;
     ui.controls.selectPeers.appendChild(opt);
  })

}


export { events }
