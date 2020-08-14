const Timer = require("timer.js");
const { ipcRenderer } = require("electron"); //引入 它提供了有限的方法，你可以从渲染进程向主进程发送同步或异步消息. 也可以收到主进程的相应.
const ProgressBar = require("progressbar.js/dist/progressbar.js");
// let progressBar = new ProgressBar.Circle("#timer-container", {
//   strokeWidth: 2,
//   color: "#F44336",
//   trailColor: "#eee",
//   trailWidth: 1,
//   svgStyle: null,
// });
function startWork(time, key) {
  let workTime = new Timer({
    //   倒计时开始

    ontick: (ms) => {
      updateTime(ms);

      //   if (key == "work") {
      //     switchButton.innerText = "正在工作";
      //   } else {
      //     switchButton.innerText = "正在休息";
      //   }
    },
    onend: () => {
      // 倒计时结束发送通知
      console.log("key", key);
      if (key == "work") {
        switchButton.innerText = "开始休息";
      } else {
        switchButton.innerText = "开始工作";
      }
      notification(key);
    },
  });
  workTime.start(time); //调用方法
}
let switchButton = document.getElementById("switch-button");
function updateTime(ms) {
  let timerCntainer = document.getElementById("container");
  let timerContainer = document.getElementById("timer-container");

  let ss = (ms / 1000).toFixed(0) % 60;
  let mm = ((ms / 1000).toFixed(0) / 60).toFixed(0);
  timerCntainer.innerText = `${mm.toString().padStart(2, 0)}: ${ss.toString().padStart(2, 0)}`;
}
async function notification(key) {
  // 异步请求/响应样式的IPC添加了ipcRenderer.invoke()

  let res = await ipcRenderer.invoke("work-notification", key); //向主进程发送事件
  console.log("res", res);
  if (res === "rest") {
    // alert("休息");
    // if (window.confirm("确认休息吗?")) {
    //   let timerCntainer = document.getElementById("container");
    //   timerCntainer.innerText = "正在休息....";
    //   setTimeout(() => {
    //     startWork();
    //   }, 5000);
    // } else {
    //   startWork();
    // }
    // startWork(3, "rest");
  } else if (res === "work") {
    // startWork(5, "work");
  }
}
switchButton.onclick = function () {
  if (this.innerText === "开始工作") {
    startWork(5, "work");
  } else if (this.innerText === "开始休息") {
    startWork(3, "rest");
  } else {
    workTimer.stop();
  }
};
// startWork();
