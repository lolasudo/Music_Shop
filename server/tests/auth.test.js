// tests/auth.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

// Мокаем sendEmail, чтобы не отправляло настоящие письма
jest.mock('../utils/sendEmail', () => jest.fn(() => Promise.resolve()));

describe('Auth API', () => {
  afterEach(async () => {
    // Чистим пользователей после каждого теста
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('POST /api/auth/register — регистрирует нового пользователя', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'testuser@example.com',
        password: 'testpassword123',
        userName: 'testuser123' // ✅ ОБЯЗАТЕЛЬНО добавляем!
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'Письмо активации отправлено на email');

    const userInDb = await User.findOne({ email: 'testuser@example.com' });
    expect(userInDb).not.toBeNull();
    expect(userInDb.isActivated).toBe(false); // По умолчанию false
  });

  it('POST /api/auth/login — не даёт войти, если пользователь не активирован', async () => {
    const user = await User.create({
      email: 'inactive@example.com',
      password: await require('bcrypt').hash('testpassword123', 12),
      activationLink: 'some-link',
      isActivated: false,
      userName: 'inactiveuser'
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'inactive@example.com',
        password: 'testpassword123',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'Аккаунт не активирован');
  });

  it('POST /api/auth/login — успешный вход после активации', async () => {
    const user = await User.create({
      email: 'active@example.com',
      password: await require('bcrypt').hash('testpassword123', 12),
      activationLink: 'some-link',
      isActivated: true,
      userName: 'activeuser',
      isAdmin: true
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'active@example.com',
        password: 'testpassword123',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('isAdmin', true);
  });
});
