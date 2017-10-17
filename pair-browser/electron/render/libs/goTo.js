import { ui } from './ui';

let goTo = url => {
  ui.webview.webview.src = url;
}

export { goTo }
