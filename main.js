const MINUTES = 25,
      SECONDS = 60

let timerMinutes = MINUTES, 
    timerSeconds = SECONDS,
    updateTimer, 
    timeFormated = ''

const timeHeading = document.querySelector("#time")
const startTimerButton = document.querySelector(".start-timer-button")
const resetTimerButton = document.querySelector(".reset-timer-button")
const iconStartTimer = document.querySelector(".start-icon")

startTimerButton.addEventListener("click", () => {
    if (timerMinutes === 0 && timerSeconds === 0) {
        restartTimer()
    }

    timeHeading.classList.toggle("running")
    iconStartTimer.innerText = "stop"
    
    if (!timeHeading.className.includes("running")) {
        stopTimer()
    } else {
        decreaseTimer()
        updateTimer = setInterval(decreaseTimer, 1000)
    }

})

resetTimerButton.addEventListener("click", () => {
    stopTimer()
    timeHeading.innerHTML = `${MINUTES}:00`
    restartTimer()
})

function decreaseTimer() {
    timerSeconds--

    if (timerSeconds === 0 & timerMinutes === 0) {
        stopTimer()
    } else if (timerSeconds === 59) {
        timerMinutes--
    } else if (timerSeconds === 0) {
        timerMinutes--
        timerSeconds = 59;
        timeFormated = ""
    }
    formatTimer()
}

function formatTimer() {
    let minutesHasOnlyOneDigit = timerMinutes < 10
    if (minutesHasOnlyOneDigit) {
        timeFormated = `0${timerMinutes}:${timerSeconds}`
    }

    let secondsHasOnlyOneDigit = timerSeconds < 10
    if (secondsHasOnlyOneDigit) {
        timeFormated = !minutesHasOnlyOneDigit
                       ? `${timerMinutes}:0${timerSeconds}` 
                       : `0${timerMinutes}:0${timerSeconds}`
    }
    timeHeading.innerHTML = timeFormated ? timeFormated : `${timerMinutes}:${timerSeconds}`
}

function stopTimer() {
    clearInterval(updateTimer)
    formatTimer()

    iconStartTimer.innerText = "play_circle_outline"
    timeHeading.classList.remove("running")
}

function restartTimer() {
    timerMinutes = MINUTES
    timerSeconds = SECONDS
    timeFormated = ''
}