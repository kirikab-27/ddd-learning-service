'use client';

import { ReactNode } from 'react';
import styles from './RootLayout.module.css';

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}
