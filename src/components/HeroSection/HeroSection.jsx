import React, { useState } from 'react';
import styles from './HeroSection.module.scss';

import MoonIcon from '../../assets/icons/MoonIcon';
import RacketIcon from '../../assets/icons/RacketIcon';
import ArrowIcon from '../../assets/icons/ArrowIcon';
import AddScroll from '../../assets/icons/AddScroll';

import GuitarImage from '../../assets/images/Guitar.png';
import { useCart } from '../../context/CartContext';

const HeroSection = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const { addToCart } = useCart();

  const handleBuyClick = () => {
    setIsButtonClicked(true);

    // Добавляем товар в корзину
    addToCart({
      id: 'guitar-les-paul',
      name: 'Gibson Les Paul',
      price: 8799,
      quantity: 1,
    });

    setTimeout(() => setIsButtonClicked(false), 1200);
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div className={styles.left}>
          <h1 className={styles.title}>Звук<br />вне времени</h1>
          <p className={styles.subtitle}>
            Минимум лишнего. Максимум звучания.<br />
            Для тех, кто слышит больше.
          </p>
          <div className={styles.price}>$8.799</div>
          <button
            className={`${styles.buyButton} ${isButtonClicked ? styles.clicked : ''}`}
            onClick={handleBuyClick}
            disabled={isButtonClicked}
          >
            <RacketIcon />
            <span>{isButtonClicked ? 'Добавлено!' : 'Купи сейчас'}</span>
          </button>
        </div>

        <div className={styles.right}>
          <div className={styles.visual}>
            <MoonIcon className={styles.moon} />
            <img src={GuitarImage} alt="Гитара" className={styles.guitar} />
            <AddScroll className={styles.scroll} />
          </div>

          <div className={styles.verticalText}>
            Gibson появились в США в 1902 году и стали символом рок-музыки. Модель Les Paul известна мощным звуком и используется легендарными гитаристами.
          </div>

          <div className={styles.listen}>
            <button
              className={styles.listenBtn}
              onClick={() => console.log('Play audio sample')}
            >
              <div className={styles.ellipse}></div>
              <ArrowIcon className={styles.arrow} />
            </button>
            <span className={styles.listenText}>послушать</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
