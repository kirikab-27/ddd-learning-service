'use client';

import { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

interface CourseLayoutProps {
  children: ReactNode;
  sidebar: ReactNode;
}

export function CourseLayout({ children, sidebar }: CourseLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary">
      <Header />
      <div className="flex flex-1 max-md:flex-col">
        <Sidebar>{sidebar}</Sidebar>
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-[800px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
