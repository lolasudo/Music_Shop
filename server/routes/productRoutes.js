const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const checkAdmin = require('../middlewares/checkAdmin');

// 🔒 Только админ
router.post('/', checkAdmin, productController.createProduct);
router.put('/:id', checkAdmin, productController.updateProduct);
router.delete('/:id', checkAdmin, productController.deleteProduct);

// 🔓 Для всех
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

module.exports = router;
