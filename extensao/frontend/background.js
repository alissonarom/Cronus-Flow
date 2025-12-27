chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id || !tab.url) return;
  if (!tab.url.includes('web.whatsapp.com')) return;

  await chrome.sidePanel.open({ tabId: tab.id });
});
