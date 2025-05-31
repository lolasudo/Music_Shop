import React, { useState } from 'react';
import styles from './AuthModal.module.scss';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    setUser(null);
    onClose();
  };

  const switchMode = () => {
    resetForm();
    setIsLoginMode(!isLoginMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLoginMode && password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const url = isLoginMode
        ? 'http://localhost:5000/api/auth/login'
        : 'http://localhost:5000/api/auth/register';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('isAdmin', data.isAdmin ? 'true' : 'false');
        }

        setUser(data.user || { email });
        if (isLoginMode) handleClose();
      } else {
        setError(data.message || 'Ошибка входа');
      }
    } catch (err) {
      console.error('Ошибка сети:', err);
      setError('Ошибка сети');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {user ? (
          <>
            <h2 className={styles.title}>Добро пожаловать, {user.name || user.email}!</h2>
            <p>Email: {user.email}</p>
            <button className={styles.submitButton} onClick={handleClose}>Выйти</button>
          </>
        ) : (
          <>
            <h2 className={styles.title}>{isLoginMode ? 'Вход в аккаунт' : 'Регистрация'}</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email</label>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="Email"  // ← вот добавлено для теста
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Пароль</label>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="Пароль"  // ← вот добавлено для теста
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isLoginMode && (
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Подтвердите пароль</label>
                  <input
                    className={styles.input}
                    type="password"
                    placeholder="Подтвердите пароль"  // ← вот добавлено для теста
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
              <button type="submit" className={styles.submitButton}>
                {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
              </button>
            </form>
            <div className={styles.loginPrompt}>
              {isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
              <button className={styles.loginButton} onClick={switchMode}>
                {isLoginMode ? 'Зарегистрироваться' : 'Войти'}
              </button>
            </div>
            <button className={styles.closeButton} onClick={handleClose}>Закрыть</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
