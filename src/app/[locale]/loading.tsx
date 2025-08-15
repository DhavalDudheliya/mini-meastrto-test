import styles from './styles.module.css';

export default function Loading() {
  return (
    <div className={styles.spinner}>
      <div className={styles.loader}></div>
    </div>
  );
}
