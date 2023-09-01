//libraries
import { Notify } from 'notiflix';

//code
const promiseFormRef = document.querySelector('.form');
promiseFormRef.addEventListener('submit', onPromiseFormRefSubmit);

function onPromiseFormRefSubmit(event) {
  event.preventDefault();

  const {
    delay: { value: delay },
    step: { value: step },
    amount: { value: amount },
  } = event.currentTarget.elements;

  for (let i = 1; i <= amount; i += 1) {
    const currentDelay = Number(delay) + Number(step) * (i - 1);

    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

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
