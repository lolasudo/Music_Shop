// tests/product.test.js
const request = require('supertest');
const app = require('../app'); // Импортируем app.js

describe('Products API', () => {
  it('GET /api/products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
