const productService = require('../services/productService');

exports.createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка создания товара', error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения товаров' });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await productService.getProduct(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка получения товара' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await productService.updateProduct(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка обновления товара' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ message: 'Товар удалён' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка удаления товара' });
  }
};
