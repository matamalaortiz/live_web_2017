var ui = {}

module.exports = ui

ui.buttons = {
  make_call: document.getElementById('make-call'),
  end_call: document.getElementById('end-call'),
  step1_retry: document.getElementById('step1-retry'),
  quit: document.getElementById('quit')
}

ui.containers = {
  my_video: document.getElementById('my-video'),
  video_container: document.getElementById('video-container'),
  their_video: document.getElementById('their_video'),
  media_container: document.getElementById('media-container'),
  media_error: document.getElementById('media-error'),
  info_peer: document.getElementById('info-peer-container'),
  call_container: document.getElementById('call-container')
}

ui.users = {
  my_id: document.getElementById('my-id'),
  call_id: document.getElementById('callto-id'),
  their_id: document.getElementById("their-id")
}
