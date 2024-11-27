const venom = require('venom-bot');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração básica do Express
app.get('/', (req, res) => {
  res.send('Bot is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function dateLog(message) {
  console.log(`${new Date().toISOString()} - ${message}`);
}

// Configuração do Venom
const venomOptions = {
  headless: false, // Vamos tentar com o navegador visível primeiro
  devtools: true, // Ativa as ferramentas de desenvolvedor para debug
  debug: true,
  logQR: true,
  browserArgs: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu'
  ]
};

function initBot() {
  dateLog('Starting bot initialization');
  
  venom
    .create(
      'sessionName',
      (base64Qr, asciiQR, attempts) => {
        dateLog(`QR Code received - Attempt ${attempts}`);
        console.log(asciiQR); // Deve mostrar o QR code no console
      },
      (statusSession) => {
        dateLog(`Status Session: ${statusSession}`);
      },
      venomOptions
    )
    .then((client) => {
      dateLog('Bot initialized successfully');
      
      client.onMessage((message) => {
        dateLog(`Message received from: ${message.from}`);
        if (message.body === 'Hi') {
          client
            .sendText(message.from, 'Welcome!')
            .then(() => {
              dateLog('Message sent successfully');
            })
            .catch((error) => {
              dateLog(`Error sending message: ${error}`);
            });
        }
      });
    })
    .catch((error) => {
      dateLog(`Error initializing bot: ${error}`);
    });
}

// Inicializa o bot
initBot();

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  dateLog('Unhandled Rejection at:');
  console.log(promise);
  dateLog(`Reason: ${reason}`);
});

process.on('uncaughtException', (error) => {
  dateLog(`Uncaught Exception: ${error}`);
});
