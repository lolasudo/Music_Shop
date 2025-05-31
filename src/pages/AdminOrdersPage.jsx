import React, { useEffect, useState } from 'react';
import styles from '../pages/AdminOrdersPage.module.scss'; // Исправлено название файла
import axios from 'axios';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (err) {
      console.error('Ошибка загрузки заказов:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/orders/${orderId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (err) {
      console.error('Ошибка обновления статуса:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return (
    <div className={styles.pageWrapper}>
      <div className={styles.loading}></div>
    </div>
  );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <h2>Админка: Список заказов</h2>
      </div>

      <div className={styles.orderList}>
        {orders.map(order => {
          const customer = order.customer || {};

          return (
            <div key={order._id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <span className={styles.orderNumber}>Заказ #{order.orderNumber || '—'}</span>
                <span className={styles.orderDate}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className={styles.customerInfo}>
                <p><strong>Клиент:</strong> {customer.name || '—'}</p>
                <p><strong>Телефон:</strong> {customer.phone || '—'}</p>
                <p><strong>Email:</strong> {customer.email || '—'}</p>
                <p><strong>Адрес:</strong> {customer.address || '—'}</p>
                <p><strong>Комментарий:</strong> {order.comment || '—'}</p>
              </div>

              <div className={styles.orderTotal}>
                Итого: <span>{order.totalPrice?.toLocaleString() || 0} ₽</span>
              </div>

              <div className={styles.statusSelect}>
                <strong>Статус:</strong>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                >
                  <option value="Новый">Новый</option>
                  <option value="Подтверждён">Подтверждён</option>
                  <option value="В пути">В пути</option>
                  <option value="Доставлен">Доставлен</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminOrdersPage;