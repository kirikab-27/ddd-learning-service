'use client';

import { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import styles from './CourseLayout.module.css';

interface CourseLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export function CourseLayout({ children, sidebar }: CourseLayoutProps) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <Sidebar>{sidebar}</Sidebar>
        <main className={styles.main}>
          <div className={styles.content}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
