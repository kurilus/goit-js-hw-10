import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Ініціалізація flatpickr
const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");

// Функція для додавання ведучих нулів
const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

// Логіка для зворотного відліку
const convertMs = ms => {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
};

// Функція для оновлення інтерфейсу
const updateTimer = ({ days, hours, minutes, seconds }) => {
  document.querySelector("[data-days]").textContent = addLeadingZero(days);
  document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
  document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
  document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
};

// Повідомлення для користувача
const showErrorMessage = (message) => {
  iziToast.error({
    title: 'Помилка',
    message: message,
    position: 'top-center',
  });
};

const showSuccessMessage = (message) => {
  iziToast.success({
    title: 'Успіх',
    message: message,
    position: 'top-center',
  });
};

// Ініціалізація flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      startButton.disabled = true;
      showErrorMessage("Please choose a date in the future");
    } else {
      startButton.disabled = false;
      showSuccessMessage("Date is valid. Click 'Start' to begin the countdown.");
    }
  },
};

// Ініціалізація flatpickr для інпуту
flatpickr(datetimePicker, options);

// Змінна для таймера
let timerInterval;

startButton.addEventListener("click", () => {
  const selectedDate = datetimePicker._flatpickr.selectedDates[0];
  if (!selectedDate) return;

  // Деактивуємо інтерфейс після натискання кнопки Start
  datetimePicker.disabled = true;
  startButton.disabled = true;

  // Запуск зворотного відліку
  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = selectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(timerInterval); // Зупиняємо таймер
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      datetimePicker.disabled = false; // Знову активуємо інпут
      showSuccessMessage("The countdown is over!");
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      updateTimer({ days, hours, minutes, seconds });
    }
  }, 1000);
});
