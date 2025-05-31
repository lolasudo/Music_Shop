const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Нет токена' });

    const token = authHeader.split(' ')[1]; // формат: "Bearer <токен>"
    if (!token) return res.status(401).json({ message: 'Неверный формат токена' });

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Доступ запрещён: вы не администратор' });
    }

    req.user = user; // на всякий случай, если нужно в контроллерах
    next(); // всё ок — пускаем дальше
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Ошибка авторизации' });
  }
};

module.exports = checkAdmin;
