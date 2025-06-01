// controllers/authController.js

const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(result.status).json(result.data);
  } catch (err) {
    console.error('Ошибка в register:', err);
    res.status(500).json({ message: 'Ошибка регистрации' });
  }
};

const activate = async (req, res) => {
  try {
    await authService.activate(req.params.link);
    res.redirect(process.env.CLIENT_URL);
  } catch (err) {
    console.error('Ошибка в activate:', err);
    res.status(500).json({ message: 'Ошибка активации' });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    console.error('Ошибка в login:', err);

    // 🚀 ВАЖНО: обрабатываем ОЖИДАЕМЫЕ ошибки как 400
    if (err.message === 'Пользователь не найден' || err.message === 'Аккаунт не активирован' || err.message === 'Неверный пароль') {
      return res.status(400).json({ message: err.message });
    }

    // Всё остальное — 500
    res.status(500).json({ message: 'Ошибка входа' });
  }
};

module.exports = { register, activate, login };
