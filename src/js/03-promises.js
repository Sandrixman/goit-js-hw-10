import Notiflix from 'notiflix';

const refs = {
  submit: document.querySelector('.form'),
  firstDelay: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('[name="step"]'),
  amountPromises: document.querySelector('[name="amount"]'),
};

refs.submit.addEventListener('submit', callPromise);

function callPromise(e) {
  e.preventDefault();
  let delay = Number(refs.firstDelay.value);
  for (let i = 1; i <= refs.amountPromises.value; i++) {
    createPromise(i, delay)
      .then(resolve => resolve)
      .catch(reject => reject);
    delay += Number(refs.delayStep.value);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          )
        );
      } else {
        reject(
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          )
        );
      }
    }, delay);
  });
}
