// index.js
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');
const app = require('./app'); // Импортируем app.js

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('Пользователь подключился к WebSocket');

  socket.on('chat message', async (msg) => {
    console.log('Получено сообщение:', msg);
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://api.sberbank.ru/gigachat',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer YOUR_API_KEY'
        },
        data: { message: msg }
      });
      const reply = response.data.reply || 'Нет ответа от GigaChat';
      socket.emit('chat response', reply);
    } catch (error) {
      console.error('Ошибка обращения к GigaChat:', error);
      let errorMessage = 'Ошибка обращения к GigaChat';
      if (error.response) {
        errorMessage += `: ${error.response.status} ${error.response.statusText}`;
      } else {
        errorMessage += `: ${error.message}`;
      }
      socket.emit('chat response', errorMessage);
    }
  });

  socket.on('disconnect', () => {
    console.log('Пользователь отключился от WebSocket');
  });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
