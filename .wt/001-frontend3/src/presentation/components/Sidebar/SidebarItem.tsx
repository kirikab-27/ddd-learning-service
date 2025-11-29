'use client';

import Link from 'next/link';
import styles from './SidebarItem.module.css';

interface SidebarItemProps {
  href: string;
  label: string;
  isActive?: boolean;
  isCompleted?: boolean;
  isLocked?: boolean;
  indent?: number;
}

export function SidebarItem({
  href,
  label,
  isActive = false,
  isCompleted = false,
  isLocked = false,
  indent = 0,
}: SidebarItemProps) {
  const className = [
    styles.item,
    isActive && styles.active,
    isCompleted && styles.completed,
    isLocked && styles.locked,
  ]
    .filter(Boolean)
    .join(' ');

  if (isLocked) {
    return (
      <div
        className={className}
        style={{ paddingLeft: `${indent * 12 + 16}px` }}
      >
        <span className={styles.lockIcon}>🔒</span>
        <span className={styles.label}>{label}</span>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      style={{ paddingLeft: `${indent * 12 + 16}px` }}
    >
      {isCompleted && <span className={styles.checkIcon}>✓</span>}
      <span className={styles.label}>{label}</span>
    </Link>
  );
}
