import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import styles from './CartPage.module.scss';
import OrderModal from './OrderModal';
import axios from 'axios';



const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    address: '',
    email: '',
    comment: '',
    deliveryTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (cartItems.length === 0 && !orderSuccess) {
    return <div className={styles.empty}>Корзина пуста</div>;
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    const priceNum = Number(item.priceText.replace(/[^\d]/g, '')) || 0;
    return sum + priceNum;
  }, 0);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const orderData = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: Number(item.priceText.replace(/[^\d]/g, '')),
          image: item.image
        })),
        totalPrice,
        comment: formData.comment,
        deliveryTime: formData.deliveryTime
      };

      // Отправляем заказ на сервер
      const response = await axios.post('/api/orders', orderData);
      
      if (response.data.success) {
        setOrderSuccess(true);
        clearCart();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
      alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className={styles.successMessage}>
        <h2>Заказ успешно оформлен!</h2>
        <p>Спасибо за ваш заказ, {formData.name}!</p>
        <p>Мы свяжемся с вами по телефону {formData.phone} для подтверждения.</p>
        <button 
          onClick={() => setOrderSuccess(false)}
          className={styles.continueShopping}
        >
          Продолжить покупки
        </button>
      </div>
    );
  }

  return (
    <section className={styles.desktopSection}>
      <div className={styles.cartPage}>
        <h1>Ваша корзина</h1>
        <ul className={styles.cartList}>
          {cartItems.map(({ id, name, priceText, image }) => (
            <li key={id} className={styles.cartItem}>
              <img src={image} alt={name} className={styles.cartImage} />
              <div className={styles.cartDetails}>
                <h3>{name}</h3>
                <p>{priceText}</p>
                <button
                  onClick={() => removeFromCart(id)}
                  className={styles.removeBtn}
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.cartSummary}>
          <p>Итого: {totalPrice.toLocaleString()} ₽</p>
          <div className={styles.buttonsWrapper}>
            <button onClick={clearCart} className={styles.clearBtn}>
              Очистить корзину
            </button>
            <button
              className={styles.checkoutBtn}
              onClick={() => setIsModalOpen(true)}
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleChange}
        isSubmitting={isSubmitting}
      />
    </section>
  );
};

export default CartPage;