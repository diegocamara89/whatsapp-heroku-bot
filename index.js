const venom = require('venom-bot');
const venomOptions = require('./venom-options.js');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Servidor HTTP para atender ao Heroku
app.get('/', (req, res) => {
  res.send('WhatsApp Bot is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Inicializa o bot Venom de forma assíncrona
const TWENTY_MINUTES = 1200000;
let client = null;

dateLog('Started index.js');
initBot();

function initBot() {
  dateLog('Initializing bot');
  venom
    .create(venomOptions)
    .then((_client) => {
      client = _client;
      startBot(client);
    })
    .catch((err) => {
      dateLog(`Error initializing bot: ${err}`);
    });
}

function startBot(client) {
  dateLog('Bot started');

  // Reinicia o bot a cada 20 minutos
  setTimeout(() => {
    client.close();
    dateLog('Bot closed');
    initBot();
  }, TWENTY_MINUTES);

  // Exemplo de resposta automática
  client.onMessage(reply);
}

function reply(message) {
  const sender = message.from;
  dateLog(`Message received from: ${sender}`);
  const replyText = 'Hi!';
  client.sendText(sender, replyText);
  dateLog(`Message: "${replyText}" sent to: ${sender}`);
}

// Aux
process.on('SIGINT', function () {
  if (client) client.close();
});

function dateLog(text) {
  console.log(new Date(), '-', text);
}
