# electron-quick-start

**Clone and run for a quick way to see Electron in action.**

This is a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start) within the Electron documentation.

**Use this app along with the [Electron API Demos](https://electronjs.org/#get-started) app for API code examples to help you get started.**

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start).

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Resources for Learning Electron

- [electronjs.org/docs](https://electronjs.org/docs) - all of Electron's documentation
- [electronjs.org/community#boilerplates](https://electronjs.org/community#boilerplates) - sample starter apps created by the community
- [electron/electron-quick-start](https://github.com/electron/electron-quick-start) - a very basic starter Electron app
- [electron/simple-samples](https://github.com/electron/simple-samples) - small applications with ideas for taking them further
- [electron/electron-api-demos](https://github.com/electron/electron-api-demos) - an Electron app that teaches you how to use Electron
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps) - small demo apps for the various Electron APIs

## License

[CC0 1.0 (Public Domain)](LICENSE.md)


# 一些笔记  
## 主进程:  
- main脚本的进程----主进程  
- 每个应用只有一个主进程  
- GUI BrowserWindow Tray Dock Menu  
- 生命周期 app  
## 渲染进程  
- 展示web页面成为渲染进程,普通web是在沙盒环境中,electron是可以通过node访问操作系统的底层  
- 可以有多个渲染进程

## 进程间通信   
### 目的:通知事件,数据传输,共享数据  
### IPC模块通信:  
#### 从渲染进程到主进程  
-callback写法:  
渲染进程: ipcRenderer.send(channel,...args)   //发送事件  
主进程: ipcRenderer.on(channel, listener)    /响应事件  
(相当于emit)  
-Promise写法 Electron7开始   
渲染进程: ipcRenderer.invoke(channel,...args)   //处理请求  
主进程: ipcMain.handle(channel, listener)    /响应模式  
#### 从主进程到渲染进程  
渲染进程: ipcRenderer.on(channel, listener)  
主进程: webContents.send(channel)  
#### 从渲染进程到渲染进程  
-通知事件:  
  通过主进程转发(5之前)  
  ipcRenderer.sendTo  
- 数据共享   
  web技术:localStorage sessionStorage indexDB  
  使用remote(不推荐 卡顿)  
