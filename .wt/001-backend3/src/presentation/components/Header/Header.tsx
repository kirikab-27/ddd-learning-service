'use client';

import styles from './Header.module.css';

interface HeaderProps {
  title?: string;
}

export function Header({ title = 'DDD実践学習' }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoIcon}>📚</span>
        <span className={styles.logoText}>{title}</span>
      </div>
      <nav className={styles.nav}>
        {/* 将来的にユーザーメニュー等を追加 */}
      </nav>
    </header>
  );
}
