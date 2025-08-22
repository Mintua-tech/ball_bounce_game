const TelegramBot = require('node-telegram-bot-api');
const WebSocket = require('ws');
require('dotenv').config();

const token = process.env.token;


const bot = new TelegramBot(token, { polling: true });

// WebSocket server for communication with the web page
const wsServer = new WebSocket.Server({ port: 8080 });
let wsConnection = null;

wsServer.on('connection', (ws) => {
    wsConnection = ws;
    console.log('WebSocket connected');
});

// Handle bot commands
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome! Use the buttons to control the game.');
    const options = {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Start', callback_data: 'start' }],
                [{ text: 'Stop', callback_data: 'stop' }],
                [{ text: 'Speed Up', callback_data: 'speed_up' }],
                [{ text: 'Slow Down', callback_data: 'slow_down' }],
                [{ text: 'Reverse', callback_data: 'reverse' }],
            ],
        },
    };
    bot.sendMessage(msg.chat.id, 'Control the ball:', options);
});

bot.on('callback_query', (query) => {
    const action = query.data;
    bot.answerCallbackQuery(query.id, { text: `Command: ${action}` });
    if (wsConnection) {
        wsConnection.send(JSON.stringify({ command: action }));
    }
});
