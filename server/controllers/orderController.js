// controllers/orderController.js
const Order = require('../models/Order');
const shortid = require('shortid');
const sendTelegramMessage = require('../utils/telegramNotify');

// Создание нового заказа
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      orderNumber: `ORD-${shortid.generate()}`
    });

    // Уведомление в Telegram
    await sendTelegramMessage(`
📦 <b>Новый заказ</b>
👤 ${order.customer.name}
📞 ${order.customer.phone}
📬 ${order.customer.address}
🕐 ${order.deliveryTime || '—'}
💬 ${order.comment || '—'}
💰 ${order.totalPrice} ₽
🛍️ Товаров: ${order.items.length}
    `);

    res.status(201).json({ success: true, orderId: order._id });
  } catch (err) {
    console.error('Ошибка при создании заказа:', err);
    res.status(500).json({ success: false, message: 'Ошибка при создании заказа' });
  }
};

// Получение всех заказов
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения заказов' });
  }
};

// Обновление статуса
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка обновления заказа' });
  }
};
