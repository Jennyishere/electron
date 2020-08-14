// Modules to control application life and create native browser window
const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // preload: path.join(__dirname, 'preload.js')
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  handleIPC();
}
function handleIPC() {
  ipcMain.handle("work-notification", async (event, ...args) => {
    console.log(args);
    let res = await new Promise((resolve, reject) => {
      let notification = new Notification({
        title: args[0] == "work" ? "工作结束" : "休息结束",
        body: args[0] == "work" ? "开始休息" : "开始工作",
        // actions: [{ text: "开始休息", type: "button" }], // macOS -
        // closeButtonText: "继续工作", // macOS -
      });
      notification.show(); //弹出通知
      resolve(args[0]);
      //  Mac系统是有两个按钮
      // notification.on("action", () => {
      //   resolve("rest");
      // });0
      // notification.on("close", () => {
      //   console.log("close");
      //   resolve("work");
      // });
    });
    return res;
  });
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
