const MINUTES = 25,
    SECONDS = 60;

let timerMinutes = MINUTES,
    timerSeconds = SECONDS,
    updateTimer;

const timeHeading = document.querySelector("#time");
const startTimerButton = document.querySelector(".start-timer-button");
const resetTimerButton = document.querySelector(".reset-timer-button");
const startIconTimer = document.querySelector(".start-icon");

startTimerButton.addEventListener("click", startTimer);

resetTimerButton.addEventListener("click", restartTimer);

document.addEventListener("keydown", (event) => {
    // When space key is clicked
    if (event.key === " ") {
        startTimer();
    } else if (event.key === "r") {
        restartTimer();
    }
});

function startTimer() {
    timeHeading.classList.toggle("running");
    startIconTimer.innerText = "stop";

    if (timeHeading.className.includes("running")) {
        decreaseTimer();
        updateTimer = setInterval(decreaseTimer, 1000);
    } else {
        stopTimer();
    }
}

function decreaseTimer() {
    timerSeconds--;

    if (timerSeconds === 0 && timerMinutes === 0) {
        stopTimer();
        restartTimer();
    } else if (timerSeconds === 59) timerMinutes--;
    else if (timerSeconds === 0) timerSeconds = SECONDS;
    formatTimer();
}

function formatTimer() {
    let stringMinutes = timerMinutes.toString().padStart(2, "0"),
        stringSeconds = timerSeconds.toString().padStart(2, "0");

    let isSeconds60 = timerSeconds === SECONDS;
    stringSeconds = isSeconds60 ? "00" : stringSeconds;

    timeHeading.innerHTML = `${stringMinutes}:${stringSeconds}`;
}

function stopTimer() {
    clearInterval(updateTimer);
    startIconTimer.innerText = "play_circle_outline";
    timeHeading.classList.remove("running");
}

function restartTimer() {
    stopTimer();
    timerMinutes = MINUTES;
    timerSeconds = SECONDS;
    timeHeading.innerHTML = `${MINUTES}:00`;
}
