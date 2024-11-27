const venom = require('venom-bot');
const venomOptions = require('./venom-options.js');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Servidor HTTP (Heroku precisa disso para validar o app)
app.get('/', (req, res) => {
  res.send('WhatsApp Bot is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Inicialização do Venom
const TWENTY_MINUTES = 1200000;
let client = null;

console.log('Starting WhatsApp Bot');
initBot();

function initBot() {
  console.log('Initializing Venom...');
  venom
    .create(venomOptions)
    .then((_client) => {
      console.log('Venom successfully initialized');
      client = _client;
      startBot(client);
    })
    .catch((err) => {
      console.error('Error initializing Venom:', err);
    });
}

function startBot(client) {
  console.log('Starting bot functionality');

  // Reinicia o bot após 20 minutos
  setTimeout(() => {
    console.log('Restarting bot...');
    client.close();
    initBot();
  }, TWENTY_MINUTES);

  // Exemplo de funcionalidade do bot
  client.onMessage(reply);
}

function reply(message) {
  const sender = message.from;
  console.log(`Message received from: ${sender}`);
  const replyText = 'Hi!';
  client.sendText(sender, replyText).then(() => {
    console.log(`Message sent to: ${sender}`);
  });
}

// Tratamento de encerramento
process.on('SIGINT', () => {
  if (client) client.close();
  console.log('Bot stopped');
});
