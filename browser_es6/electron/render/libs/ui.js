let ui = {}


ui.controls = {
  locationForm: document.getElementById('location-form'),
  centerColumn: document.getElementById('center-column'),
  location: document.getElementById('location')
}

ui.footer = {
  footerBar: document.getElementById('footer-bar'),
  message: document.getElementById('message'),
  submitMessage: document.getElementById('submit-message')
}

ui.webview = {
  webview: document.querySelector('webview')
}


export {
  ui
}