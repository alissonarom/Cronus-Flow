const API_BASE = 'https://apps-cronus-flow.ptiotg.easypanel.host';

export async function analyzeMessage(leadMessage) {
  const res = await fetch(`${API_BASE}/v1/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ leadMessage })
  });

  if (!res.ok) throw new Error('analyze_failed');
  return res.json();
}

export async function sendFeedbackApi(payload) {
  const res = await fetch(`${API_BASE}/v1/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error('feedback_failed');
}
