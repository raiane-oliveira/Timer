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

resetTimerButton.addEventListener("click", () => {
    restartTimer();
    timeHeading.innerHTML = `${MINUTES}:00`;
});

document.addEventListener("keydown", (event) => {
    // When space key is clicked
    if (event.key === " ") {
        startTimer();
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
    let stringMinutes, stringSeconds;

    let minutesHasOnlyOneDigit = timerMinutes < 10;
    stringMinutes = minutesHasOnlyOneDigit ? `0${timerMinutes}` : timerMinutes;

    let secondsHasOnlyOneDigit = timerSeconds < 10;
    let isSeconds60 = timerSeconds === SECONDS;
    stringSeconds = secondsHasOnlyOneDigit ? `0${timerSeconds}` : timerSeconds;
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
}
