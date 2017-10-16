import { ui } from './ui';

let vimeoPlugin = function vimeoPlugin() {

  let url = ui.controls.location.value.split("://")[1].split("/")[1];
  console.log(url);
  
  if ( url === "vimeo.com" ){
    console.log("hello vimeo");
  }

}

export { vimeoPlugin }
