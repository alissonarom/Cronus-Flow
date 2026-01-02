export let lastAnalysis = {
  leadMessage: '',
  reply: '',
  channel: 'whatsapp-web'
};

export function setLastAnalysis(data) {
  lastAnalysis = data;
}
