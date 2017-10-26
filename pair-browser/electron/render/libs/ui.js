let ui = {}

ui.controls = {
  url: document.getElementById('url'),
  locationForm: document.getElementById('location-form'),
  centerColumn: document.getElementById('center-column'),
  location: document.getElementById('location'),
  selectPeers: document.getElementById('peerIds'),
}

ui.chat = {
  msg: document.getElementById('msg'),
  chatBar: document.getElementById('chat-bar'),
  message: document.getElementById('message'),
  submitMessage: document.getElementById('submit-message'),
  response: document.getElementById('response')
}

ui.user = {
  nameSpan: document.getElementById('name-span'),
  name: document.getElementById('name-user'),
  userBar: document.getElementById('user-bar'),
}

ui.webview = {
  webview: document.querySelector('webview')
}

ui.document = {
  title: document.querySelector('title')
}



export { ui }
