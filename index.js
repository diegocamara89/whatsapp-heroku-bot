const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware necessário para processar as requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express server
app.get('/', (req, res) => {
    res.send('WhatsApp Bot Server is running!');
});

// Rota para enviar mensagens
app.get('/send', async (req, res) => {
    try {
        console.log('Requisição recebida:', req.query); // Log para debug
        
        const number = req.query.number;
        const message = req.query.message;

        if (!number || !message) {
            return res.status(400).send('Número e mensagem são obrigatórios');
        }

        const chatId = number + "@c.us";
        console.log('Tentando enviar mensagem para:', chatId); // Log para debug
        
        const result = await client.sendMessage(chatId, message);
        console.log('Resultado do envio:', result); // Log para debug
        
        res.send('Mensagem enviada com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        res.status(500).send('Erro ao enviar mensagem: ' + error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// WhatsApp Client
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    }
});

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

// Initialize
console.log('Initializing...');
client.initialize()
    .catch(err => {
        console.error('Initialization error:', err);
    });

// Error handling
process.on('uncaughtException', err => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled rejection at:', promise, 'reason:', reason);
});
