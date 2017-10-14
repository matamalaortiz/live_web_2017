let ui = {}


ui.controls = {
  url: document.getElementById('url'),
  locationForm: document.getElementById('location-form'),
  centerColumn: document.getElementById('center-column'),
  location: document.getElementById('location')
}

ui.chat = {
  msg: document.getElementById('msg'),
  chatBar: document.getElementById('chat-bar'),
  message: document.getElementById('message'),
  submitMessage: document.getElementById('submit-message'),
  response: document.getElementById('response')

}

ui.webview = {
  webview: document.querySelector('webview')
}


export {
  ui
}
