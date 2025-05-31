// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const dadataRoutes = require('./routes/dadataRoutes');
const path = require('path');

dotenv.config();

const app = express();

// Настройка CORS
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: 'GET,POST',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.json());

// Соединение с БД
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Database connection error:', err));

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dadata', dadataRoutes);

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app; // ВАЖНО! Экспортируем app для index.js И для тестов!
