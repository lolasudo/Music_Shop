import React from 'react';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        {/* Колонки с ссылками */}
        <div className={styles.textContainer}>

          {/* Первая колонка */}
          <div className={styles.column}>
            <h3 className={styles.title}>Компания</h3>
            <a href="#" className={styles.link}>Блог</a>
            <a href="#" className={styles.link}>Вакансии</a>
            <a href="#" className={styles.link}>Цены</a>
            <a href="#" className={styles.link}>Клиенты</a>
            <a href="#" className={styles.link}>Контакты</a>
          </div>

          {/* Вторая колонка */}
          <div className={styles.column}>
            <h3 className={styles.title}>Продукты</h3>
            <a href="#" className={styles.link}>Платежный шлюз</a>
            <a href="#" className={styles.link}>Сетевые токены</a>
            <a href="#" className={styles.link}>Apple & Google Pay</a>
            <a href="#" className={styles.link}>Сканирование уязвимостей</a>
            <a href="#" className={styles.link}>Защищенные хранилища</a>
          </div>

          {/* Третья колонка */}
          <div className={styles.column}>
            <h3 className={styles.title}>Решения</h3>
            <a href="#" className={styles.link}>Управление картами</a>
            <a href="#" className={styles.link}>PCI соответствие</a>
            <a href="#" className={styles.link}>Мульти-PSP</a>
            <a href="#" className={styles.link}>Выпуск карт</a>
            <a href="#" className={styles.link}>Управление кошельками</a>
          </div>

        </div>

        {/* Нижняя часть с копирайтом */}
        <div className={styles.bottomBar}>
          <span>© 2025 Evervault Inc. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
};
export default Footer;