import { analyzeMessage, sendFeedbackApi } from './api.js';
import { lastAnalysis, setLastAnalysis } from './state.js';
import { registerFeedback } from './animations.js';
import { initProgress } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
initProgress();
const input = document.getElementById('leadInput');
const result = document.getElementById('result');
const status = document.getElementById('status');
const loading = document.getElementById('loading');
const feedback = document.getElementById('feedback');

const progressLabel = document.getElementById('progressLabel');
const progressFill = document.getElementById('progressFill');

  if (!progressLabel || !progressFill) {
    console.warn('[Cronus] Progress UI not found');
    return;
  }

document.getElementById('analyzeBtn').addEventListener('click', async () => {
  if (!input.value.trim()) {
    status.innerText = 'Cole uma mensagem primeiro.';
    return;
  }

  loading.classList.remove('hidden');
  status.innerText = 'Analisando...';
  result.value = '';

  try {
    const data = await analyzeMessage(input.value);

    result.value = data.reply;
    status.innerText = 'Sugestão pronta ✔';
    feedback.classList.remove('hidden');

    setLastAnalysis({
      leadMessage: input.value,
      reply: data.reply,
      channel: 'whatsapp-web'
    });

  } catch {
    status.innerText = 'Erro ao gerar sugestão';
  } finally {
    loading.classList.add('hidden');
  }
});

async function sendFeedback(converted) {
  if (!lastAnalysis.reply) return;

  status.innerText = 'Enviando feedback...';

  try {
    await sendFeedbackApi({
      ...lastAnalysis,
      converted
    });

    registerFeedback();
    status.innerText = 'Feedback registrado ✔';
  } catch {
    status.innerText = 'Erro ao enviar feedback';
  }
}

document.getElementById('feedbackYes')
  .addEventListener('click', () => sendFeedback(true));

document.getElementById('feedbackNo')
  .addEventListener('click', () => sendFeedback(false));

const toggleThemeBtn = document.getElementById('toggleTheme');
  const html = document.documentElement;

  if (!toggleThemeBtn) {
    console.warn('[Cronus] Toggle theme button not found');
    return;
  }

  // 🔁 carregar tema salvo
  const savedTheme = localStorage.getItem('cronus-theme');
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  }

  toggleThemeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', next);
    localStorage.setItem('cronus-theme', next);

    // micro feedback visual opcional
    toggleThemeBtn.classList.add('copy-success');
    setTimeout(() => {
      toggleThemeBtn.classList.remove('copy-success');
    }, 300);
  });

});
