const express = require('express');
const router = express.Router();
const axios = require('axios');

// Маршрут для подсказок адресов
router.post('/suggestions', async (req, res) => {
  try {
    const { query } = req.body;
    
    const response = await axios.post(
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      { query, count: 5 },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${process.env.DADATA_API_KEY}`,
          'X-Secret': process.env.DADATA_SECRET_KEY
        }
      }
    );

    res.json(response.data.suggestions);
  } catch (error) {
    console.error('DaData error:', error);
    res.status(500).json({ error: 'Failed to fetch address suggestions' });
  }
  
});

module.exports = router;