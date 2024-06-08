let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startPauseStopwatch() {
    if (!running) {
        running = true;
        startPauseBtn.textContent = 'Pause';
        startTime = Date.now() - difference;
        tInterval = setInterval(getShowTime, 1);
    } else {
        running = false;
        startPauseBtn.textContent = 'Start';
        clearInterval(tInterval);
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.textContent = '00:00:00';
    startPauseBtn.textContent = 'Start';
    laps.innerHTML = '';
    lapCounter = 1;
}

function getShowTime() {
    updatedTime = Date.now() - startTime;
    difference = updatedTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    milliseconds = (milliseconds < 10) ? '0' + milliseconds : milliseconds;

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
    if (running) {
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        laps.appendChild(li);
        lapCounter++;
    }
}

startPauseBtn.addEventListener('click', startPauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
