// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
console.log(555);

var shell = require('electron').shell;
shell.openExternal('https://github.com');
function a(){
  console.log(66);
}
