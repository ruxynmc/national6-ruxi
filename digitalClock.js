console.log("JavaScript - Digital Clock - Homework");

let seconds = 0;
const secondsParagraphs = document.querySelectorAll(".seconds p");

let minutes = 0;
const minutesParagraphs = document.querySelectorAll(".minutes p");

let hours = 0;
const hoursParagraphs = document.querySelectorAll(".hours p");

const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");
const saveButton = document.getElementById("save-button");

let currentTime;

const savingsList = document.querySelector(".savings-list");

startButton.addEventListener("click", startTimer);

stopButton.addEventListener("click", stopTimer);

resetButton.addEventListener("click", resetTimer);

saveButton.addEventListener("click", saveTimer);

function startTimer() {

    currentTime = setInterval(function() {
        renderDigits(seconds, secondsParagraphs);
        renderDigits(minutes, minutesParagraphs);
        renderDigits(hours, hoursParagraphs);

        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        
        if (hours === 24) {
            hours = 0;
        }
    }, 10);
}

function stopTimer() {
    clearInterval(currentTime);
}

function resetTimer() {
    clearInterval(currentTime);
    seconds = 0;
    minutes = 0;
    hours = 0;
    secondsParagraphs.innerText = "0";
    minutesParagraphs.innerText = "0";
    hoursParagraphs.innerText = "0";
}

function saveTimer() {
    const newSaving = document.createElement("div");
    savingsList.appendChild(newSaving);
    // newSaving.innerText = hoursParagraphs.innerText + ":" + minutesParagraphs.innerText + ":" + secondsParagraphs.innerText;
    newSaving.innerText = hours + ":" + minutes + ":" + seconds;
}

function renderDigits (nr, pList) {
    const stringDigits = nr + "";
    const digitList = stringDigits.split("");

    if (digitList.length == 2) {
        pList[0].innerText = digitList[0];
        pList[1].innerText = digitList[1];
    } else {
        pList[0].innerText = 0;
        pList[1].innerText = digitList[0];
    }
}