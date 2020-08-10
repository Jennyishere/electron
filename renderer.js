const Timer = require('timer.js')
const {ipcRenderer} =require('electron')  //引入 它提供了有限的方法，你可以从渲染进程向主进程发送同步或异步消息. 也可以收到主进程的相应.
function startWork(){
    let workTime = new Timer({
        ontick: (ms) => {
           
            updateTime(ms)
        },
        onend: () => {
            notification()
        }
    })
    workTime.start(10)
}
function updateTime(ms){
    let timerCntainer=document.getElementById('container')
    let ss = (ms / 1000).toFixed(0) % 60
    let mm = ((ms / 1000).toFixed(0) / 60).toFixed(0)
    timerCntainer.innerText = `${mm.toString().padStart(2, 0)}: ${ss.toString().padStart(2, 0)}`
    if(ss==1){
        console.log(123);
        notification() 
    }
}
async function notification(){
    // 异步请求/响应样式的IPC添加了ipcRenderer.invoke() 
  let res= await  ipcRenderer.invoke('work-notification')
  if(res==='rest'){
setTimeout(() => {
    alert('休息')
}, 5000);
  }else if(res==='work'){
      startWork()
  }
}
startWork()