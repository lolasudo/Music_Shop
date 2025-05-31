import React from 'react';
import styles from './Loading.module.scss';

const Loading = ({ progress = 0, style }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={styles.loadingOverlay} style={style}>
      <div className={styles.loadingContent}>
        <div className={styles.spinnerContainer}>
          <svg 
            className={styles.spinnerLogo} 
            viewBox="0 0 100 100"
          >
            <circle
              className={styles.spinnerBackground}
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="8"
              fill="none"
            />
            <circle
              className={styles.spinnerProgress}
              cx="50"
              cy="50"
              r={radius}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              fill="none"
              transform="rotate(-90 50 50)"
            />
            <image 
              href="/Vector.svg" 
              x="25" 
              y="25" 
              width="50" 
              height="50" 
            />
          </svg>
        </div>
        <span className={styles.loadingText}>
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default Loading;