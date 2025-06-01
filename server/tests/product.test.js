// tests/product.test.js

// ⚠️ Загружаем .env.test !
require('dotenv').config({ path: '.env.test' });

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

beforeAll(async () => {
  process.env.NODE_ENV = 'test';
  await mongoose.connect(process.env.TEST_DB_URL);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Products API', () => {
  it('GET /api/products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
