import { ui } from './ui';

let createLayout = () => {
  let controls = document.querySelector('#controls');
  let controlsHeight = controls.offsetHeight;
  let windowWidth = document.documentElement.clientWidth;
  let windowHeight = document.documentElement.clientHeight;
  let webviewWidth = windowWidth;
  let webviewHeight = windowHeight - controlsHeight;

  ui.webview.webview.style.width = webviewWidth + 'px';
  ui.webview.webview.style.height = webviewHeight + 'px';
}

window.onresize = createLayout;


export { createLayout }
