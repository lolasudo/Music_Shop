import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';

import radioIcon from '../../assets/icons/IconCard/famicons_radio-outline.svg';
import headphonesIcon from '../../assets/icons/IconCard/material-symbols-light_headphones-outline-rounded.svg';
import pianoIcon from '../../assets/icons/IconCard/material-symbols-light_piano.svg';
import guitarIcon from '../../assets/icons/IconCard/mdi_guitar-pick-outline.svg';
import musicIcon from '../../assets/icons/IconCard/mdi-light_music.svg';
import microphoneIcon from '../../assets/icons/IconCard/Vector.svg';

import RacketIcon from '../../assets/icons/RacketIcon';

const cards = [
  { icon: microphoneIcon, alt: 'Микрофон', title: 'Микрофон' },
  { icon: headphonesIcon, alt: 'Наушники', title: 'Наушники' },
  { icon: radioIcon, alt: 'Радио', title: 'Радио' },
  { icon: guitarIcon, alt: 'Гитара', title: 'Гитара' },
  { icon: musicIcon, alt: 'Музыка', title: 'Музыка' },
  { icon: pianoIcon, alt: 'Пианино', title: 'Пианино' },
];

const ProductCard = () => {
  return (
    <section className={styles.productCard}>
      <div className={styles.cardContainer}>
        <div className={styles.topHeading}>
          <div className={styles.headingCard}>
            <div className={styles.topText}>
              <h1 className={styles.top_h1}>Бестселлеры</h1>
              <h2 className={styles.top_h2}>посмотри на самые востребованные категории</h2>
            </div>
            <button className={styles.buttonCard}>
              <RacketIcon />
              узнать больше
            </button>
          </div>
        </div>

        <div className={styles.topWrapper}>
          {[0, 1].map(row => (
            <div key={row} className={styles.topCards}>
              {cards.slice(row * 3, row * 3 + 3).map(({ icon, alt, title }) => (
                <Link to={`/category/${title.toLowerCase()}`} key={title} className={styles.cardLink}>
                  <div className={styles.top_card}>
                    <div className={styles.cardImageContainer}>
                      <img src={icon} alt={alt} className={styles.cardImage} />
                    </div>
                    <p className={styles.cardTitle}>{title}</p>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;