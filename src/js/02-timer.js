import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate <= now) {
      // alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      document.querySelector('[data-start]').disabled = true;
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

const datePicker = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  document.querySelector('[data-start]').disabled = true;

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

document.querySelector('[data-start]').addEventListener('click', () => {
  const selectedDate = datePicker.selectedDates[0];
  const now = new Date();

  if (selectedDate <= now) {
    // alert('Please choose a date in the future');
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }

  let timeDifference = selectedDate - now;

  const timerInterval = setInterval(() => {
    const remainingTime = convertMs(timeDifference);

    document.querySelector('[data-days]').textContent = addLeadingZero(
      remainingTime.days
    );
    document.querySelector('[data-hours]').textContent = addLeadingZero(
      remainingTime.hours
    );
    document.querySelector('[data-minutes]').textContent = addLeadingZero(
      remainingTime.minutes
    );
    document.querySelector('[data-seconds]').textContent = addLeadingZero(
      remainingTime.seconds
    );

    timeDifference -= 1000;

    if (timeDifference < 0) {
      clearInterval(timerInterval);
      document.querySelector('[data-start]').disabled = true;
    }
  }, 1000);
});
