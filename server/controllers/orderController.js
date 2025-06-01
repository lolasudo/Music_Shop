const orderService = require('../services/orderService');

exports.createOrder = async (req, res) => {
  try {
    const orderId = await orderService.createOrder(req.body);
    res.status(201).json({ success: true, orderId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Ошибка при создании заказа' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения заказов' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.json({ success: true, order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка обновления заказа' });
  }
};
