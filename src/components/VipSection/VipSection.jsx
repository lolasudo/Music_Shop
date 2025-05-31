import React from 'react';
import styles from './VipSection.module.scss';

const VipSection = () => {
  return (
    <section className={styles.vipSection}>
      <div className={styles.vipContainer}>
        <div className={styles.left}>
          <div className={styles.vipCard}>
            {/* Цветные круги для фона */}
            <div className={styles.backgroundCircle1} />
            <div className={styles.backgroundCircle2} />
            <div className={styles.ellipseThird} />
            
            <div className={styles.card}>
              <h1 className={styles.vipText}>VIP</h1>
              <h1 className={styles.nameText}>NAME SURNAME</h1>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.titleVip}>
            <div className={styles.h1_1}>VIP-Привилегии</div>
            <div className={styles.h1_2}>
              эксклюзивный доступ к лимитированным инструментам, бесплатная профессиональная настройка, специальные скидки на редкие экземпляры, закрытые уроки от виртуозов и приглашения на приватные мастер-классы.
            </div>
          </div>

          <div className={styles.vipButton}>
            <button className={styles.button}>VIP</button>
            <button className={styles.button}>SALE</button>
            <button className={styles.button}>PRO</button>
            <button className={styles.button}>LES</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VipSection;
