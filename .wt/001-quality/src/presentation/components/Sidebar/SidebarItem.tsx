'use client';

import Link from 'next/link';

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
  const baseClasses = 'flex items-center gap-2 py-2 px-4 text-text-secondary transition-colors duration-150';
  const hoverClasses = !isLocked ? 'hover:bg-bg-tertiary hover:text-text-primary' : '';
  const activeClasses = isActive ? 'bg-bg-tertiary text-accent border-l-[3px] border-accent' : '';
  const completedClasses = isCompleted ? 'text-success' : '';
  const lockedClasses = isLocked ? 'text-text-muted cursor-not-allowed' : '';

  const className = [baseClasses, hoverClasses, activeClasses, completedClasses, lockedClasses]
    .filter(Boolean)
    .join(' ');

  if (isLocked) {
    return (
      <div
        className={className}
        style={{ paddingLeft: `${indent * 12 + 16}px` }}
      >
        <span className="text-sm">🔒</span>
        <span className="text-sm leading-snug">{label}</span>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      style={{ paddingLeft: `${indent * 12 + 16}px` }}
    >
      {isCompleted && <span className="text-success font-bold">✓</span>}
      <span className="text-sm leading-snug">{label}</span>
    </Link>
  );
}
