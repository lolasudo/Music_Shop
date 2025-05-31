const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const checkAdmin = require('../middlewares/checkAdmin'); // Раскомментировано

// Пользователь оформляет заказ
router.post('/', orderController.createOrder);

// Админ: получить все заказы
router.get('/', checkAdmin, orderController.getAllOrders);

// Админ: обновить статус заказа
router.put('/:id', checkAdmin, orderController.updateOrderStatus);

module.exports = router;
