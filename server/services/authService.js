// services/authService.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

const register = async ({ email, password, userName }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { status: 400, data: { message: 'Пользователь уже существует' } };
  }

  // Считаем сколько уже есть пользователей
  const existingUsersCount = await User.countDocuments();
  
  // Если первый → будет админом
  const isAdmin = existingUsersCount === 0;

  const hashedPassword = await bcrypt.hash(password, 12);
  const activationLink = uuidv4();

  const newUser = await User.create({
    email,
    password: hashedPassword,
    activationLink,
    userName,
    isAdmin // 👈 Передаём сюда!
  });

  const activationUrl = `${process.env.API_URL}/api/auth/activate/${activationLink}`;
  await sendEmail(email, activationUrl);

  return { status: 201, data: { message: 'Письмо активации отправлено на email' } };
};

const activate = async (link) => {
  const user = await User.findOne({ activationLink: link });
  if (!user) throw new Error('Некорректная ссылка активации');

  user.isActivated = true;
  await user.save();
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Пользователь не найден');
  if (!user.isActivated) throw new Error('Аккаунт не активирован');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Неверный пароль');

  const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });

  return { token, isAdmin: user.isAdmin };
};

module.exports = { register, activate, login };
