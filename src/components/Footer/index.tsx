import Link from 'next/link';
import { useState } from 'react';
import styles from './footer.module.scss';
import Prismic from '@prismicio/client';
import handleNextPage from '../../pages/post/[slug]';

export function Footer() {
  return (
    <div className={styles.footerContainer}>
      <h3 className={styles.divider}>
        _______________________________________________________________________
      </h3>
      <div>
        <main className={styles.postPagination}>
          <div>
            <Link href="/">Post Anterior</Link>
          </div>
          <div>
            <Link href="/">Próximo Post</Link>
          </div>
        </main>
      </div>
    </div>
  );
}
