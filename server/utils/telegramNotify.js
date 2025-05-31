// server/utils/telegramNotify.js
const axios = require('axios');

const BOT_TOKEN = '7490338320:AAG6rk5p9L1zc5-KSPLMPRuLZOhmffenhFo';
const CHAT_ID = '1005672847';

async function sendTelegramMessage(message) {
  try {
    await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    });
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error.response?.data || error.message);
  }
}

module.exports = sendTelegramMessage;
