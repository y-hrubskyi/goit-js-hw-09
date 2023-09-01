//libraries
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//styles
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.6.min.css';

//code
const refs = {
  datetimeInput: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),

  daysField: document.querySelector('.value[data-days]'),
  hoursField: document.querySelector('.value[data-hours]'),
  minutesField: document.querySelector('.value[data-minutes]'),
  secondsField: document.querySelector('.value[data-seconds]'),
};
let selectedDate = null;
let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate - Date.now() <= 0) {
      refs.startBtn.disabled = true;
      refs.stopBtn.disabled = true;
      showNotify();
      return;
    }
    refs.startBtn.disabled = false;
  },
};
flatpickr(refs.datetimeInput, options);

function onStartBtnClick() {
  if (selectedDate - Date.now() <= 0) {
    refs.startBtn.disabled = true;
    showFailureNotify();
    return;
  }

  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  refs.datetimeInput.disabled = true;

  intervalId = setInterval(() => {
    const difference = selectedDate - Date.now();
    if (difference < 0) {
      clearInterval(intervalId);
      Notify.success('The END');
      return;
    }
    const convertedTime = convertMs(difference);
    renderTime(convertedTime);
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(intervalId);
  refs.stopBtn.disabled = true;
  refs.startBtn.disabled = false;
  refs.datetimeInput.disabled = false;
}

function renderTime({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = pad(days);
  refs.hoursField.textContent = pad(hours);
  refs.minutesField.textContent = pad(minutes);
  refs.secondsField.textContent = pad(seconds);
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

function showFailureNotify() {
  Notify.failure('Please choose a date in the future');
}

function pad(time) {
  return String(time).padStart(2, '0');
}
