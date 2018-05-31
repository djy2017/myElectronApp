const electron = require('electron')
const app = electron.app
const ipcMain = electron.ipcMain

const actions = require('./actions')

module.exports = function() {
  actions.defaultProxy()

  // app ready 创建窗口
  app.on('ready', function() {
    actions.creatWin()
  })

  // Quit when all windows are closed.
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', function () {
    actions.activate()
  })

  app.on('login', function(event, webContents, request, authInfo, callback){
    actions.appLogin(event, webContents, request, authInfo, callback)
  })

  app.on('web-contents-created', (event, contents) => {
    actions.webContentsCreated(event, contents)
  })

  // ipc事件 最小化window
  ipcMain.on('miniwindow', function(event, arg) {
    actions.mainWindow(event, arg)
  })

  // ipc事件 webcontents path 回退
  ipcMain.on('webContentsGoback',(err,arg)=>{
    actions.webcontentsGoback(err,arg)
  })

  // ipc事件 登录
  ipcMain.on('login',(err,arg)=>{
    actions.login(err,arg)
  })

  // ipc事件 打开子窗口
  ipcMain.on('openchildwindow',(err,arg)=>{
    actions.openchildwindow(err,arg)
  })

  // ipc事件 设置proxy.pac
  ipcMain.on('switchProxy',(err,data)=>{
    actions.switchProxy(err,data)
  })

}