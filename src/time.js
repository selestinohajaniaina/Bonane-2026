// const audio = document.getElementById('sound');

const songs = [
  'tick-tock-clock-close-up.wav',      // 0 → countdown
  'happy-new-year.mp3',                // 1 → bonne année
  'happy-xmas-happy-new-year.mp3',     // 2
  'new-year.mp3'                       // 3
];

const timerEl = document.getElementById('countdown-timer');
let countdownInterval;
let isNewYear = false;

/* ---------- Date du prochain nouvel an ---------- */
function nextNewYear() {
  const now = new Date();
  return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
}

/* ---------- Format countdown ---------- */
function formatCountdown(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${days}j ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2,'0')}min ${String(seconds).padStart(2,'0')}s`;
}


/* ---------- Countdown ---------- */
function startCountdown() {
  const target = nextNewYear();

  function tick() {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0 && !isNewYear) {
      isNewYear = true;
      clearInterval(countdownInterval);

      timerEl.textContent = '🎉 Happy New Year! 🎉';
      return;
    }

    timerEl.textContent = formatCountdown(diff);
  }

  tick();
  countdownInterval = setInterval(tick, 1000);
}

/* ---------- Lancer ---------- */
startCountdown();