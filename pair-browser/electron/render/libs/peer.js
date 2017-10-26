import { loadBrowser } from './loadBrowser';
import { socket } from './socket';
import { ui } from './ui';
import Peer from 'simple-peer';

let peer = new Peer({
  initiator: true,
  trickle: false
})

let peerID;

let events = () => {
  peer.on('signal', data => {
     console.log('peerConnected')
     peerID = JSON.stringify(data);
  })

}


export { events, peerID }
