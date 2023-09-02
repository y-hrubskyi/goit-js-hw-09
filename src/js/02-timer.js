//libraries
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix';

//styles
import 'flatpickr/dist/flatpickr.min.css';

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
    if (selectedDate <= Date.now()) {
      refs.startBtn.disabled = true;
      refs.stopBtn.disabled = true;
      showFailureNotify();
      return;
    }
    refs.startBtn.disabled = false;
  },
};
flatpickr(refs.datetimeInput, options);

function onStartBtnClick() {
  if (selectedDate <= Date.now()) {
    refs.startBtn.disabled = true;
    showFailureNotify();
    return;
  }

  changeDisabled();
  intervalId = setInterval(() => {
    if (selectedDate <= Date.now()) {
      onStopBtnClick();
      Notify.success('The END');
      return;
    }
    const convertedTime = convertMs(selectedDate - Date.now());
    renderTime(convertedTime);
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(intervalId);
  changeDisabled();
}

function changeDisabled() {
  refs.stopBtn.disabled = !refs.stopBtn.disabled;
  refs.startBtn.disabled = !refs.startBtn.disabled;
  refs.datetimeInput.disabled = !refs.datetimeInput.disabled;
}

function renderTime({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = addLeadingZero(days);
  refs.hoursField.textContent = addLeadingZero(hours);
  refs.minutesField.textContent = addLeadingZero(minutes);
  refs.secondsField.textContent = addLeadingZero(seconds);
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
