let timer;
let isRunning = false;
let elapsedTime = 0; // in milliseconds
let lapCount = 0;

const display = document.getElementById('display');
const laps = document.getElementById('laps');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(ms % 1000).padStart(3, '0').substring(0, 2); // only show 2 digits for milliseconds
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
    if (isRunning) return;
    isRunning = true;
    timer = setInterval(() => {
        elapsedTime += 10; // update every 10 milliseconds
        updateDisplay();
    }, 10);
    startButton.textContent = 'Stop';
    startButton.classList.add('stop');
    startButton.removeEventListener('click', startStopwatch);
    startButton.addEventListener('click', stopStopwatch);
}

function stopStopwatch() {
    if (!isRunning) return;
    clearInterval(timer);
    isRunning = false;
    startButton.textContent = 'Start';
    startButton.classList.remove('stop');
    startButton.removeEventListener('click', stopStopwatch);
    startButton.addEventListener('click', startStopwatch);
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    laps.innerHTML = '';
    lapCount = 0;
    startButton.textContent = 'Start'; // Ensure button reads 'Start' after reset
    startButton.classList.remove('stop'); // Ensure color is reset
}

function addLap() {
    if (!isRunning) return;
    lapCount++;
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement('div');
    lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
    laps.appendChild(lapElement);
}

startButton.addEventListener('click', startStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', addLap);
