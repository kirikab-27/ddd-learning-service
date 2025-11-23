'use client';

import { ReactNode } from 'react';

interface SidebarProps {
  children: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="w-[280px] flex-shrink-0 bg-bg-secondary border-r border-border overflow-y-auto md:w-[280px] max-md:w-full max-md:border-r-0 max-md:border-b max-md:border-border">
      <nav className="flex flex-col py-4">
        {children}
      </nav>
    </aside>
  );
}
