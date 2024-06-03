let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;
const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (savedTime || 0);
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    running = false;
    display.innerHTML = "00:00:00:00";
    lapsContainer.innerHTML = "";
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.innerHTML = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.textContent = display.innerHTML;
        lapsContainer.appendChild(lapTime);
    }
}
