import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
const btnRef = document.querySelector('[data-start]');

let ms = 0;
let idInterval = null;

btnRef.setAttribute('disabled', '');

btnRef.addEventListener('click', timer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    ms = selectedDates[0] - options.defaultDate;
    if (ms < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    btnRef.removeAttribute('disabled', '');
  },
  onOpen() {
    clearInterval(idInterval);
  }
};

flatpickr("#datetime-picker", options);

function timer() {
  updateTime();
  idInterval = setInterval(() => {
    if (ms <= 1000) {
      clearInterval(idInterval);
      Notiflix.Notify.success('Finish');
      return;
    }
    ms -= 1000;
    updateTime();
  }, 1000);
  btnRef.setAttribute('disabled', '');
}

function updateTime() {
  const {days, hours, minutes, seconds} = convertMs(ms);

  daysRef.textContent = `${days}`;
  hoursRef.textContent = `${hours}`;
  minutesRef.textContent = `${minutes}`;
  secondsRef.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
