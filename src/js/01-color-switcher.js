const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

const colorChanges = {
  intervalId: null,
  isActive: false,
  start() {
    this.intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
  },
};

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  colorChanges.start();
});

refs.stopBtn.addEventListener('click', () => {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  colorChanges.stop();
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
