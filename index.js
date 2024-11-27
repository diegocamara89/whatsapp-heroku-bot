const venom = require('venom-bot');
const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Bot is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

console.log('Starting bot...');

venom
  .create({
    session: 'test-session',
    headless: false, // Vamos forçar o navegador a abrir
    useChrome: true,
    debug: true,
    logQR: true,
    browserArgs: ['--no-sandbox']
  })
  .then((client) => {
    console.log('Bot initialized!');
    client.onMessage((message) => {
      console.log('Message received:', message.body);
    });
  })
  .catch((err) => {
    console.error('Error initializing bot:', err);
  });
