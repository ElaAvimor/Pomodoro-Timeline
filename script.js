const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const taskNameInput = document.getElementById('task-name');
const taskDurationInput = document.getElementById('task-duration');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let timeLeft = 30 * 60; // Initial time in seconds
let timerId;

// At any point, a new task can be added to the task list. 
addTaskBtn.addEventListener('click', addTask);


function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/** Starts the timer's countdown starting at the current time left
 *  until time is out (timeLeft = 0) and updates the display.
 *  While time is running, the "start" button switches to "pause".
 *  At any point, the "reset" button can be clicked.
 */
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

/** Pauses the timer's countdown.
 *  Once "pause" is clicked, the button changes to "start".
 *  At any point, the "reset" button can be clicked.
 */
function pauseTimer() {
    clearInterval(timerId);
    // Change button to "Start"
    startBtn.textContent = "Start";
    startBtn.removeEventListener('click', pauseTimer);
    startBtn.addEventListener('click', startTimer);
    resetBtn.addEventListener('click', resetTimer);
}

/** Resets the timer back to the original time alloted */
function resetTimer() {
    clearInterval(timerId);
    timeLeft = 30 * 60;
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

/** Adds a new task to the task list */
function addTask(){
    const taskName = taskNameInput.value;

    // if taskName is a valid non-empty string, we create 
    // a new task with the given name and add it to the task list.
    // When adding a task, a checkbox (<input type="checkbox">) is created dynamically for each task item.
    // The checkbox is then appended to the task list item (<li>) along with the task name.
    if(taskName){
        const task = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        task.appendChild(checkbox);
        task.appendChild(document.createTextNode(`${taskName}`));
    
        taskList.appendChild(task);

        // Clear input field for the next task.
        taskNameInput.value = '';
    } else {
        alert('Please enter a valid task name')
    }
}