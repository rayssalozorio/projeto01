import { useEffect } from 'react';
import styles from './comments.module.scss';

export function Comments() {
  useEffect(() => {
    let script = document.createElement('script');
    let anchor = document.getElementById('inject-comments-for-uterances');
    script.setAttribute('src', 'https://utteranc.es/client.js');
    script.setAttribute('crossorigin', 'anonymous');
    script.setAttribute('async', 'true');
    script.setAttribute('repo', 'rayssalozorio/projeto01');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'github-light');
    anchor.appendChild(script);
  }, []);
  return (
    <div className={styles.comments} id="inject-comments-for-uterances">
      Comments
    </div>
  );
}
