import React, { useEffect, useRef, useState } from 'react';
import styles from './OrderModal.module.scss';

const DADATA_API_KEY = '4b7e235c9d33e0c199fa8ad029a539c1cfeb3eb0';
const DADATA_SECRET_KEY = 'd056dbf8cc723997ccb769e84a399faeea47fbef';

const AddressInput = ({ value = '', onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const fetchAddressSuggestions = async (query) => {
    try {
      const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Token ${DADATA_API_KEY}`
        },
        body: JSON.stringify({ query, count: 5 })
      });

      const data = await response.json();
      setSuggestions(data.suggestions || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Ошибка получения подсказок:', error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    onChange(e);
    if (e.target.value.length > 2) {
      fetchAddressSuggestions(e.target.value);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onChange({ target: { name: 'address', value: suggestion.value } });
    setShowSuggestions(false);
  };

  return (
    <div className={styles.addressContainer}>
      <input
        ref={inputRef}
        name="address"
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Улица, дом, квартира"
        required
        className={styles.input}
        autoComplete="off"
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((item, index) => (
            <li 
              key={index} 
              className={styles.suggestionItem}
              onClick={() => handleSuggestionClick(item)}
            >
              {item.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const OrderModal = ({ isOpen, onClose, onSubmit, formData = {}, onChange }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Оформление заказа</h2>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Имя
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name || ''}
              onChange={onChange}
              className={styles.input}
              placeholder="Введите ваше имя"
              required
              autoFocus
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phone" className={styles.label}>
              Телефон
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone || ''}
              onChange={onChange}
              className={styles.input}
              placeholder="+7 (___) ___-__-__"
              required
              pattern="\+?\d{10,15}"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="address" className={styles.label}>
              Адрес доставки
            </label>
            <AddressInput value={formData.address || ''} onChange={onChange} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={onChange}
              className={styles.input}
              placeholder="Введите ваш email"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="comment" className={styles.label}>
              Комментарий
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment || ''}
              onChange={onChange}
              className={styles.input}
              placeholder="Особые пожелания"
              rows={3}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="deliveryTime" className={styles.label}>
              Время доставки
            </label>
            <input
              id="deliveryTime"
              name="deliveryTime"
              type="time"
              value={formData.deliveryTime || ''}
              onChange={onChange}
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Подтвердить заказ
          </button>
        </form>

        <button onClick={onClose} className={styles.closeButton}>
          Отмена
        </button>
      </div>
    </div>
  );
};

export default OrderModal;