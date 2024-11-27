const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Express server
app.get('/', (req, res) => {
    res.send('WhatsApp Bot Server is running!');
});

// Rota para enviar mensagens
app.get('/send', async (req, res) => {
    try {
        // O número deve estar no formato internacional: 5511999999999
        const number = req.query.number;
        const message = req.query.message;

        if (!number || !message) {
            return res.status(400).send('Número e mensagem são obrigatórios');
        }

        const chatId = number + "@c.us"; // Formato necessário para o WhatsApp
        
        // Envia a mensagem
        await client.sendMessage(chatId, message);
        
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
    
    // Teste de envio após conexão
    const numeroTeste = "5584998353107"; // Substitua pelo número que quer testar
    const chatId = numeroTeste + "@c.us";
    
    client.sendMessage(chatId, "Mensagem de teste do bot!")
        .then(response => {
            console.log('Mensagem enviada com sucesso!');
        })
        .catch(err => {
            console.error('Erro ao enviar mensagem:', err);
        });
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
