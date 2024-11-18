import styles from "../../style/Spinner.module.css";
import React, { ReactNode } from "react";

interface SpinnerProps {
  children: ReactNode;
  isLoading: boolean;
}
const ConfigDataTableSkeleton = ({ children, isLoading }: SpinnerProps) => {
  return (
    <div className={`${styles.spinnerWrapper}`}>
      {isLoading && (
        <div className={styles.overlay}>
          <div className={styles.spinner}>
            <div className={`${styles.dot} ${styles.dot1}`}></div>
            <div className={`${styles.dot} ${styles.dot2}`}></div>
            <div className={`${styles.dot} ${styles.dot3}`}></div>
          </div>
        </div>
      )}
      <div className={`${styles.content} ${isLoading ? styles.dimmed : ""} `}>
        {children}
      </div>
    </div>
  );
};

export default ConfigDataTableSkeleton;
