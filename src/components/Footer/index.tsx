import Link from 'next/link';
import styles from './footer.module.scss';

export function Footer() {
  return (
    <div className={styles.footerContainer}>
      <h3 className={styles.divider}>
        _______________________________________________________________________
      </h3>
      <div>
        <main className={styles.postPagination}>
          <Link href="/">Post Anterior</Link>
          <Link href="/">Próximo Post</Link>
        </main>
      </div>
    </div>
  );
}
