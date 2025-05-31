import React, { useState } from 'react';
import styles from './MicrophonesPage.module.scss';
import { useCart } from '../../context/CartContext';
import mic1 from '../../assets/images/mic1.png';
import mic2 from '../../assets/images/mic2.png';
import mic4 from '../../assets/images/mic4.png';
import background from '../../assets/images/BacroungVip.png';

const allProducts = [
  { id: 1, name: 'Shure SM58', price: 120000, image: mic1 },
  { id: 2, name: 'AKG C414', price: 350000, image: mic2 },
  { id: 3, name: 'Rode NT1', price: 187000, image: mic4},
  { id: 4, name: 'Budget Mic X', price: 91000, image: mic1 },
  { id: 5, name: 'Budget Mic Y', price: 99000, image: mic1 },
  { id: 6, name: 'Budget Mic Z', price: 95000, image: mic1 },
];

const brands = ['Shure', 'AKG', 'Rode', 'Budget X', 'Budget Y', 'Budget Z'];

const MicrophonesPage = () => {
  const { addToCart, cartItems } = useCart();
  const isInCart = (id) => cartItems.some(item => item.id === id);

  const [filters, setFilters] = useState({
    new: false,
    sale: false,
    installment: false,
  });

  const toggleFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const [priceFilter, setPriceFilter] = useState('all');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const filteredProducts = allProducts.filter(p => {
    if (priceFilter === 'expensive') return p.price > 150000;
    if (priceFilter === 'mid') return p.price <= 150000 && p.price >= 100000;
    if (priceFilter === 'budget') return p.price < 100000;
    return true;
  });

  return (
    <div className={styles.pageWrapper} style={{ background: `url(${background}) center/cover no-repeat` }}>
      <aside className={styles.sidebar}>
        <h2 className={styles.title}>Категории</h2>
        <div className={styles.category}>микрофоны</div>

        <div className={styles.filterBlock}>

          {[
            { key: 'new', label: 'Новинки', icon: 'NEW' },
            { key: 'sale', label: 'Скидки', icon: '%' },
            { key: 'installment', label: 'Рассрочка', icon: '0%' },
            
          ].map(({ key, label, icon }) => (
            <div key={key} className={styles.switchRow}>
              <div className={styles.filterIcon}>{icon}</div>
              <span className={styles.filterLabel}>{label}</span>
              <div className={styles.switch} onClick={() => toggleFilter(key)}>
                <div
                  className={filters[key] ? styles.switchKnobActive : styles.switchKnob}
                ></div>
              </div>
            </div>
          ))}
        </div>
 <div className={styles.divider}></div>
        <div className={styles.buyButtons}>
          <button className={styles.buyNow} onClick={() => setPriceFilter('expensive')}>Дорогое</button>
          <button className={styles.buyNow} onClick={() => setPriceFilter('mid')}>Среднее</button>
          <button className={styles.buyNow} onClick={() => setPriceFilter('budget')}>Бюджетное</button>
          <button className={styles.buyNow} onClick={() => setPriceFilter('all')}>Все</button>
        </div>
      </aside>

      <main className={styles.content}>
        <div className={styles.headerRow}>
          <h1>Микрофоны</h1>
          <div className={styles.count}>{filteredProducts.length}</div>
        </div>

        <div className={styles.carousel}>
          <button className={styles.arrowLeft} onClick={() => setCarouselIndex((carouselIndex - 1 + brands.length) % brands.length)}>{'<'}</button>
          {[...Array(3)].map((_, i) => {
            const index = (carouselIndex + i) % brands.length;
            return (
              <button key={i} className={styles.carouselButton}>{brands[index]}</button>
            );
          })}
          <button className={styles.arrowRight} onClick={() => setCarouselIndex((carouselIndex + 1) % brands.length)}>{'>'}</button>
        </div>

        <div className={styles.checkContainer}>
          <label><input type="checkbox" className={styles.checkbox} /> Под заказ</label>
          <label><input type="checkbox" className={styles.checkbox} /> В наличии</label>
        </div>

        <div className={styles.cardGrid}>
          {filteredProducts.map(({ id, name, price, image }) => (
            <div key={id} className={styles.card}>
              <div className={styles.cardImage}><img src={image} alt={name} /></div>
              <div className={styles.cardInfo}>
                <p className={styles.name}>{name}</p>
                <p className={styles.price}>{price.toLocaleString()} ₽</p>
                <p className={styles.desc}>Описание микрофона</p>
                <div className={styles.rating}>★ 4.7 (12)</div>
              </div>
              <button
                className={styles.buy}
                onClick={() => addToCart({ id, name, price, priceText: `${price.toLocaleString()} ₽`, image })}
                disabled={isInCart(id)}
              >
                {isInCart(id) ? 'В корзине' : 'Добавить в корзину'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MicrophonesPage;
