let feedbackCount = Number(localStorage.getItem('flowFeedbacks')) || 0;

function getUI() {
  return {
    fill: document.getElementById('progressFill'),
    label: document.getElementById('progressLabel')
  };
}

function updateProgress() {
  const { fill, label } = getUI();
  if (!fill || !label) return;

  const max = 50;
  const percent = Math.min((feedbackCount / max) * 100, 100);

  fill.style.width = `${percent}%`;

  let text = 'Nível de Maturidade do seu Flow';
  if (feedbackCount >= 20) text = 'Flow Treinado';
  if (feedbackCount >= 50) text = 'Flow Maduro';

  label.textContent = `${text} (${feedbackCount}/${max})`;
}

export function registerFeedback() {
  feedbackCount++;
  localStorage.setItem('flowFeedbacks', feedbackCount);
  updateProgress();
}

export function initProgress() {
  updateProgress();
}
