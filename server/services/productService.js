const Product = require('../models/Product');

const createProduct = async (productData) => {
  const product = await Product.create(productData);
  return product;
};

const getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

const getProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('Товар не найден');
  return product;
};

const updateProduct = async (id, updateData) => {
  const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
  if (!updated) throw new Error('Товар не найден');
  return updated;
};

const deleteProduct = async (id) => {
  await Product.findByIdAndDelete(id);
};

module.exports = { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct };
