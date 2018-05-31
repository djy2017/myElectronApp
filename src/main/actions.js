module.exports = {
  creatWin: creatWin,
  changeSize: changeSize,
  activate: activate,
  defaultProxy: defaultProxy,
  appLogin: appLogin,
  webContentsCreated: webContentsCreated,
  miniwindow: miniwindow,
  webcontentsGoback: webcontentsGoback,
  login: login,
  openchildwindow: openchildwindow,
  switchProxy: switchProxy
} 

const fs = require('fs')
const path = require('path')
const url = require('url')
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

// mainWindow 若初始化为null会导致启动报错
let mainWindow
let webContents

// 创建主窗口
function creatWin() {
  let indexPage = !process.env.THEDEMO ? 'index' : process.env.THEDEMO
  let options = {
    width: 800, 
  	height: 600,
  	frame: false
  } 

  mainWindow = new BrowserWindow(options)

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../render/index/' + indexPage.replace(/\s/g,'') + '.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('close', () => { mainWindow = null })

  webContents = mainWindow.webContents;
}

// 尺寸设置
function changeSize(w,h) {
  return mainWindow&&mainWindow.setSize(w,h,true)
}

// 初始化代理proxy
function defaultProxy() {
  app.commandLine.appendSwitch('proxy-server', 'SOCKS5://23.236.77.160:1080');
}


function activate() {
  if (mainWindow === null) {
    createWindow()
  }
}

// app login events
function appLogin(event, webContents, request, authInfo, callback) {
  event.preventDefault()
  console.log(callback)
  callback('test', 'test')
}

// webcontents created events 
// 应用场景：google搜索下的结果点击不会新开tab，该事件能允许在改变location时进行阻止
function webContentsCreated(event, contents) {
  if (contents.getType() === 'webview') {
    contents.on('will-navigate', (event, url) => {
    // event.preventDefault();
    // require('electron').shell.openExternal(url);
    })
  }
}

// 窗口最小化、最大化、关闭
function miniwindow(event, arg) {
  if (arg=='0') {
    mainWindow.minimize()
  } else if (arg=='1') {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
  }else{
    mainWindow.close()
  }
}

// webcontents url 回退
function webcontentsGoback(err,arg) {
  webContents.goBack()
}

// 登录后的新窗口、页面
function login(err,arg) {
  new BrowserWindow({
    width: 800, 
    height: 600,
    frame:false
  }).loadURL(url.format({
    pathname: path.join(__dirname, '../render/index'),
    protocol: 'file:',
    slashes: true
  }))
}

// new 一个新窗口
function openchildwindow(err,arg) {
  new BrowserWindow({parent: mainWindow})
}

//切换代理
function switchProxy(err,data) {
  webcontent.session.setProxy({pacScript:'file://' + __dirname + '../proxy/proxy.pac'}, function () {
    webcontent.send('setProxy_success','ok')
  })
}