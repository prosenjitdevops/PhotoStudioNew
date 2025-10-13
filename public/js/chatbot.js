function sendChat(query) {
  fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  }).then(r => r.json()).then(data => addMessage(data.reply, 'bot-message'));
}

function respondTo(query) {
  if (!query) return;
  addMessage(query, 'user-message');
  sendChat(query);
}
