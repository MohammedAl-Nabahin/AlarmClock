const addAlarm = document.getElementById("add");
var alarmAudio = document.getElementById('alarm-audio');

const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
audio.loop = true;


const getTimeString = ({ hours, minutes, seconds, state }) => {
    if (minutes / 10 < 1) {
      minutes = "0" + minutes;
    }
    if (seconds / 10 < 1) {
      seconds = "0" + seconds;
    }
    return `${hours}:${minutes}:${seconds} ${state}`;
  };
  function ringing(time){
    audio.play();
    alert(`It's ${time}` +  "\nTo Stop the Alarm Refresh The Page");
}

  const renderTime = () => {
    var currentTime = document.getElementById("current-time");
    const currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    var state = hours >= 12 ? "PM" : "AM";
    
    
    if (hours > 12) {
      hours = hours % 12;
    }
    
    const newTime = `${hours}:${minutes}:${seconds}:${state}`;
    currentTime.innerHTML = newTime;
        if(fakeAlarms.includes(newTime) && true){
            ringing(newTime);
            alert(notify);
        }
    }


  setInterval(renderTime, 1000);




const alarms = document.querySelector("#alarm-list-show");

let fakeAlarms = [];

const userInput = document.querySelector("#userInput");


userInput.addEventListener("submit" , function(e) {
    e.preventDefault();

    const hours = userInput.hour.value;
    const minutes = userInput.min.value;
    const state = userInput.state.value;
    const seconds = userInput.sec.value;

    const newAlarm  = `${hours}:${minutes}:${seconds}:${state}`;
    if(isNaN(newAlarm)){
        if(!fakeAlarms.includes(newAlarm)){
            fakeAlarms.push(newAlarm);
            showAlarm(newAlarm);
        userInput.reset();
        }else{
            alert(`Alarm for ${newAlarm} is Already Added`);
        }
    }
    else{
        alert("Invalid Time!");
    }
});




function showAlarm(newAlarm){
    const timo = `<li class="alarm-list-show">
    <span class="alarm-list-show">${newAlarm}</span>
    <button class="deleteAlarm"  onclick="remove(this.value)" style="padding:10px" value =${newAlarm}>Delete</button>
    </li>`; 
    alarms.innerHTML +=timo;
}


function remove(value) {
    alarms.addEventListener('click', function (event) {
        var elm = event.target;
        var nemo = elm.nodeName;
        if (nemo.toLowerCase() == 'button') {
            for (var i = 0; i < fakeAlarms.length; i++) {
                if (fakeAlarms[i] == value) {
                    fakeAlarms.splice(fakeAlarms[i], 1);
                }
            }
            alarms.removeChild(elm.parentElement);
            fakeAlarms.pop();
            event.stopPropagation();
            event.preventDefault();
        }
    });
}

console.table(fakeAlarms);