const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

let timeLeft = 25 * 60; // Initial time in seconds
let timerId;

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerId);
            // Play sound notification
            alert('Time is up!');
        }
    }, 1000);
    // Change button to "Pause"
    startBtn.textContent = "Pause";
    startBtn.removeEventListener('click', startTimer);
    startBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
}

function pauseTimer() {
    clearInterval(timerId);
    // Change button to "Start"
    startBtn.textContent = "Start";
    startBtn.removeEventListener('click', pauseTimer);
    startBtn.addEventListener('click', startTimer);
    resetBtn.addEventListener('click', resetTimer);
}

function resetTimer() {
    clearInterval(timerId);
    timeLeft = 25 * 60;
    updateTimerDisplay();
    // Change button to "Start"
    startBtn.textContent = "Start";
    startBtn.removeEventListener('click', pauseTimer); // Remove the event listener for pauseTimer
    startBtn.addEventListener('click', startTimer); // Add the event listener for startTimer
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateTimerDisplay(); // Initial display
