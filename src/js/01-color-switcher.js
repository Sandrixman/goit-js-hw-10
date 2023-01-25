const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStop.setAttribute('disabled', '');

let intervalId = null;

const getRandomHexColor= () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStart.addEventListener('click', () => {
  intervalId = setInterval(changeColor, 1000);
  btnStart.setAttribute('disabled', '');
  btnStop.removeAttribute('disabled', '');
});

btnStop.addEventListener('click', () => {
  clearInterval(intervalId);
    btnStart.removeAttribute('disabled', '');
    btnStop.setAttribute('disabled', '');
})

function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
