var currentTime = new Date().toLocaleTimeString();
var cTime = Date.now();
var alarmTime = new Date().setHours(0, 0, 0);
var sound = new Audio("sample.mp3");
document.getElementById("set-alarm").addEventListener("click", setTimer());
setInterval(updateTime, 1000);
function updateTime() {
  currentTime = new Date().toLocaleTimeString();
  cTime = Date.now();
  document.getElementById("time-disp").textContent = "Current time: " + currentTime;
}
function updateDifference() {
  var timeLeft = alarmTime - cTime;
  var TimeLeftHrs = Math.floor(timeLeft / (3.6e+6));
  var TimeLeftMins = Math.floor((timeLeft % (3.6e+6)) / (60000));
  var TimeLeftSecs = Math.floor((timeLeft % (3.6e+6)) % (60000) / 1000);
  if (TimeLeftMins < 10)
    TimeLeftMins = TimeLeftMins.toString().padStart(2, '0');
  if (TimeLeftSecs < 10)
    TimeLeftSecs = TimeLeftSecs.toString().padStart(2, '0');
  var timeLeftStr = TimeLeftHrs + ":" + TimeLeftMins + ":" + TimeLeftSecs;
  if (timeLeft <= 0) {
    activateAlarm();
  }
  document.getElementById("time-left").textContent = "Time Left: " + timeLeftStr;
}
function acceptTime() {
  alarmTime = document.getElementById("timePicker").value;
  var toAdd = alarmTime.split(":");
  alarmTime = (parseInt(toAdd[0]) * (3.6e+6) + parseInt(toAdd[1]) * (60000));
  document.getElementById("set-time").innerHTML = "";
  alarmTime = alarmTime + (cTime - (cTime % 8.64e+7) + 1.8e+7);
  if (alarmTime < cTime)
    alarmTime = alarmTime + 8.64e+7;
  alarmTime = new Date(alarmTime);
  document.getElementById("alarm-disp").textContent = "Current Alarm: " + alarmTime.toLocaleString();
  setInterval(updateDifference, 1000);
}
function setTimer() {
  document.getElementById("set-time").innerHTML = '<input type = "time" id = "timePicker" ></input> <button id = "submit">Submit!</button>';
  document.getElementById("submit").addEventListener("click", acceptTime);
}

function activateAlarm() {
  document.getElementById("time-left").style.color = "red";
  document.getElementById("time-left").textContent = "ALARM ACTIVATED";
  sound.play();
  setTimeout(function() {
    sound.pause();
  }, 3000);
}