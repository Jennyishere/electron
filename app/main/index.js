const {app,BrowserWindow}=require('electron')
let mainWindow
app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // preload: path.join(__dirname, 'preload.js')
        webPreferences: {
          nodeIntegration: true,
        },
      });
        // and load the index.html of the app.
  mainWindow.loadURL("http://localhost:8082/");
})