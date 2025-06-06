import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

console.log(document.querySelector("#datetime-picker"));



const dateTimePicker = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let timerId = null;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selected = selectedDates[0];
    const now = new Date();

    if (selected <= now) {
      iziToast.error({
        title: "Error",
        message: "Illegal operation",
        titleColor: "#fff",
        messageColor: "#fff",
        backgroundColor: "#ef4444",
        position: "topRight",
        timeout: 5000,
        progressBarColor: "#fff",
        close: true,
        closeOnClick: true,
        animateInside: true,
        transitionIn: "fadeInDown",
        transitionOut: "fadeOutUp",
      });
      startButton.disabled = true;
    }
    else {
      userSelectedDate = selected;
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

startButton.addEventListener("click", () => {
  if (!userSelectedDate) return;

  startButton.disabled = true;
  dateTimePicker.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const diff = userSelectedDate - now;

    if (diff <= 0) {
      clearInterval(timerId);
      updateTimerDisplay(0);
      dateTimePicker.disabled = false;
      startButton.disabled = true;
      return;
    }

    updateTimerDisplay(diff);
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function updateTimerDisplay(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);

  daysSpan.textContent = days; 
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
