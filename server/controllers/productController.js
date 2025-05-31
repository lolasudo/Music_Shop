const Product = require('../models/Product');

// 🔹 Создание товара (только админ)
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка создания товара', error: err.message });
  }
};

// 🔹 Получить все товары
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения товаров' });
  }
};

// 🔹 Получить один товар
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Товар не найден' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения товара' });
  }
};

// 🔹 Обновить товар (только админ)
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Товар не найден' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка обновления товара' });
  }
};

// 🔹 Удалить товар (только админ)
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Товар удалён' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка удаления товара' });
  }
};
