import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = parseInt(form.elements.delay.value);
  const stepInput = parseInt(form.elements.step.value);
  const amountInput = parseInt(form.elements.amount.value);

  for (let i = 0; i < amountInput; i++) {
    const delay = delayInput + i * stepInput;
    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.failure(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
