const Order = require('../models/Order');
const shortid = require('shortid');
const sendTelegramMessage = require('../utils/telegramNotify');

const createOrder = async (orderData) => {
  const order = await Order.create({
    ...orderData,
    orderNumber: `ORD-${shortid.generate()}`
  });

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

  return order._id;
};

const getAllOrders = async () => {
  const orders = await Order.find().sort({ createdAt: -1 });
  return orders;
};

const updateOrderStatus = async (id, status) => {
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
  if (!order) throw new Error('Заказ не найден');
  return order;
};

module.exports = { createOrder, getAllOrders, updateOrderStatus };
