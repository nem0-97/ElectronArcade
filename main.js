const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');
const shell=require('electron').shell;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, '/app/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  //win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

function changeContent(htmlPath){
  win.loadURL(url.format({
    pathname: htmlPath,
    protocol: 'file:',
    slashes: true
  }));
}

function createMenu(){
  //add menu
  let menu=Menu.buildFromTemplate([
    {
      label:'Menu',
      submenu:[
        {label:'test1'},
        {
          label:'test2',
          click(){
            shell.openExternal('https://google.com');
          }
        },
        {type:'separator'},
        {
          label:'exit',
          click(){app.quit();}//click is keyword has to be named that
        },
      ]
    },
    {
      label:'Games',
      submenu:[
        {
          label:'Asteroids',
          click(){
            changeContent(path.join(__dirname, '/app/Games/Asteroids/index.html'));//
          }
        },
        {
          label:'Driving',
          click(){
            changeContent(path.join(__dirname, '/app/Games/Driving/index.html'));//
          }
        },{
          label:'Flappy Bird',
          click(){
            changeContent(path.join(__dirname, '/app/Games/Flappy Bird/index.html'));//
          }
        },
        {
          label:'Frogger',
          click(){
            changeContent(path.join(__dirname, '/app/Games/Frogger/index.html'));//
          }
        },{
          label:'Maze',
          click(){
            changeContent(path.join(__dirname, '/app/Games/Maze/index.html'));//
          }
        },
        {
          label:'Pong',
          click(){
            changeContent(path.join(__dirname, '/app/Games/Pong/index.html'));//
          }
        },{
          label:'Snake',
          click(){
            changeContent(path.join(__dirname, '/app/Games/Snake/index.html'));//
          }
        },
        {
          label:'Space Invaders',
          click(){
            changeContent(path.join(__dirname, '/app/Games/Space Invaders/index.html'));//
          }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
    createMenu();
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
    createMenu();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
