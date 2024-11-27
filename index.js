const venom = require('venom-bot');
const venomOptions = require('./venom-options.js');
const express = require('express');

// Configuração do servidor para Heroku
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('WhatsApp Bot is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const TWENTY_MINUTES = 1200000;
let client = null;

dateLog('Started index.js');
initBot();

function initBot() {
  dateLog('Initializing bot');
  venom
    // create bot with options
    .create(venomOptions)
    // start bot
    .then((client) => startBot(client))
    // catch errors
    .catch((err) => {
      dateLog(err);
    });
}

function startBot(_client) {
  dateLog('Starting bot');
  client = _client;

  // restart bot every 20 minutes
  // stops working otherwise
  setTimeout(() => {
    // close bot
    client.close();
    dateLog('Closing bot');

    // init bot again
    initBot();
  }, TWENTY_MINUTES);

  //
  // add your code here
  //

  // example: reply every message with "Hi!"
  client.onMessage(reply);
}

function reply(message) {
  const sender = message.from;
  dateLog(`Message received from: ${sender}`);
  const replyText = 'Hi!';
  client.sendText(sender, replyText);
  dateLog(`Message: "${replyText}" sent to: ${sender}`);
}

//
// Aux
//

// Catch ctrl+C
process.on('SIGINT', function () {
  client.close();
});

function dateLog(text) {
  console.log(new Date(), ' - ', text);
}
