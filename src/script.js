const key = 'newyear_message';
const form = document.getElementById('ny-form');
const textarea = document.getElementById('message');
const savedText = document.getElementById('saved-text');
const savedMeta = document.getElementById('saved-meta');
const status = document.getElementById('status');
const copyBtn = document.getElementById('copy');
const clearBtn = document.getElementById('clear');
const messageContent = document.getElementById('message-content');
var msgs = [];

async function render() {
    msgs = await load();
    msgs.reverse();
    console.log('msg obj: ', msgs);
    let timer = 3;
    msgs.map((e) => {
        setTimeout(() => addMessage(e.text), timer * 1000);
        timer += 4;
    });
}

function addMessage(msg) {
    const newSaved = document.createElement('div');
    newSaved.className = 'message bg-white p-4 rounded shadow w-fit absolute bottom-0 left-1/4 z-10';
    const newSavedP = document.createElement('p');
    newSavedP.className = 'text-gray-800 whitespace-pre-wrap w-fit';
    newSavedP.innerText = msg;
    newSaved.prepend(newSavedP);
    messageContent.prepend(newSaved);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = textarea.value.trim();
    if (!text) {
        status.textContent = 'Ecrire votre message.';
        setTimeout(() => status.textContent = '', 2000);
        return;
    }
    save({ text });
    textarea.value = '';
    render();
    status.textContent = 'Message envoyé ✅';
    addMessage(text);
    setTimeout(() => status.textContent = '', 2000);
});

clearBtn.addEventListener('click', () => textarea.value = '');

render();


const audio = document.getElementById('sound');

function unlockAudio() {
  audio.play().catch(() => {});
  document.removeEventListener('click', unlockAudio);
  document.removeEventListener('touchstart', unlockAudio);
  document.removeEventListener('keydown', unlockAudio);
}


['click','touchstart','keydown'].forEach(evt => {
  document.addEventListener(evt, unlockAudio, { once: true });
});
