const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true }, // 👈 Уникальный номер заказа
  customer: {
    name: String,
    phone: String,
    email: String,
    address: String,
  },
  items: [
    {
      id: String,
      name: String,
      price: Number,
      image: String
    }
  ],
  totalPrice: Number,
  comment: String,
  deliveryTime: String,
  status: { type: String, default: 'Новый' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
