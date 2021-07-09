import styles from './header.module.scss';
import Link from 'next/link';

export default function Header(props) {
  return (
    <div className={styles.header}>
      <main className={props.isMain ? styles.true : styles.false}>
        <Link href="/">
          <img src="/images/logo.png" alt="logo" />
        </Link>
      </main>
    </div>
  );
}
