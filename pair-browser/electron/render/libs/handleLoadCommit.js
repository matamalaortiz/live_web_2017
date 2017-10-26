import { ui } from './ui';
import { socket } from './socket';

let handleLoadCommit = () => {
  let pastUrl = ui.controls.location.value;

  ui.controls.location.value = ui.webview.webview.getURL();

  let newUrl = ui.controls.location.value;

  if(pastUrl != newUrl){
    console.log("not equal", pastUrl, newUrl);
    socket.emit('newlocation', newUrl);
    pastUrl = newUrl;
  }

  ui.document.title.innerText = ui.webview.webview.getTitle();

}

export { handleLoadCommit }
