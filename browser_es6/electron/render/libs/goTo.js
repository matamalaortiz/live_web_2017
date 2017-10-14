import { ui } from './ui';

let goTo = function goTo(url) {
  ui.webview.webview.src = url;
}

export { goTo }
