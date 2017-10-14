(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _ui = require('./libs/ui');

var _socket = require('./libs/socket');

var _loadBrowser = require('./libs/loadBrowser');

var _createLayout = require('./libs/createLayout');

var _goTo = require('./libs/goTo');

var _handleLoadCommit = require('./libs/handleLoadCommit');

},{"./libs/createLayout":2,"./libs/goTo":3,"./libs/handleLoadCommit":4,"./libs/loadBrowser":5,"./libs/socket":6,"./libs/ui":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLayout = undefined;

var _ui = require('./ui');

var createLayout = function createLayout() {
  var controls = document.querySelector('#controls');
  var controlsHeight = controls.offsetHeight;
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;
  var webviewWidth = windowWidth;
  var webviewHeight = windowHeight - controlsHeight;

  _ui.ui.webview.webview.style.width = webviewWidth + 'px';
  _ui.ui.webview.webview.style.height = webviewHeight + 'px';
};

window.onresize = createLayout;

exports.createLayout = createLayout;

},{"./ui":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.goTo = undefined;

var _ui = require('./ui');

var goTo = function goTo(url) {
  _ui.ui.webview.webview.src = url;
};

exports.goTo = goTo;

},{"./ui":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleLoadCommit = undefined;

var _ui = require('./ui');

var _socket = require('./socket');

var handleLoadCommit = function handleLoadCommit() {
  var pastUrl = _ui.ui.controls.location.value;

  _ui.ui.controls.location.value = _ui.ui.webview.webview.getURL();

  var newUrl = _ui.ui.controls.location.value;

  if (pastUrl != newUrl) {
    console.log("not equal", pastUrl, newUrl);
    _socket.socket.emit('newlocation', newUrl);
    pastUrl = newUrl;
  }
};

exports.handleLoadCommit = handleLoadCommit;

},{"./socket":6,"./ui":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadBrowser = undefined;

var _ui = require('./ui');

var _createLayout = require('./createLayout');

var _socket = require('./socket');

var _goTo = require('./goTo');

var _handleLoadCommit = require('./handleLoadCommit');

var loadBrowser = onload = function onload() {
  var currentLink = "";
  (0, _createLayout.createLayout)();

  _socket.socket.on('connect', function () {
    console.log("Connected");
  });

  _ui.ui.chat.chatBar.onsubmit = function (e) {
    e.preventDefault();
    var msg = _ui.ui.chat.message.value;
    console.log(msg);
    _socket.socket.emit('chatmessage', msg);
  };

  // Receive from any event
  _socket.socket.on('chatmessage', function (data) {
    console.log('from server:' + data);
    _ui.ui.chat.response.innerHTML = "<span style='color:#e0bbbb'> | " + _socket.socket.id + " : " + " " + " </span> " + data;
    _ui.ui.chat.message.value = "";
  });

  _socket.socket.on('newlocation', function (link) {
    currentLink = link;
    if (currentLink != "") {
      (0, _goTo.goTo)(currentLink);
    }
  });

  _ui.ui.controls.locationForm.onsubmit = function (e) {
    e.preventDefault();
    var locInput = _ui.ui.controls.location.value;
    _socket.socket.emit('location', locInput);
  };

  _socket.socket.on('location', function (input) {
    currentLink = input;
    if (currentLink != "") {
      (0, _goTo.goTo)(currentLink);
    }
  });

  _ui.ui.webview.webview.addEventListener('did-finish-load', _handleLoadCommit.handleLoadCommit);
};

exports.loadBrowser = loadBrowser;

},{"./createLayout":2,"./goTo":3,"./handleLoadCommit":4,"./socket":6,"./ui":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var socket = io.connect("http://165.227.66.228:7000");

exports.socket = socket;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ui = {};

ui.controls = {
  url: document.getElementById('url'),
  locationForm: document.getElementById('location-form'),
  centerColumn: document.getElementById('center-column'),
  location: document.getElementById('location')
};

ui.chat = {
  msg: document.getElementById('msg'),
  chatBar: document.getElementById('chat-bar'),
  message: document.getElementById('message'),
  submitMessage: document.getElementById('submit-message'),
  response: document.getElementById('response')

};

ui.webview = {
  webview: document.querySelector('webview')
};

exports.ui = ui;

},{}]},{},[1]);
