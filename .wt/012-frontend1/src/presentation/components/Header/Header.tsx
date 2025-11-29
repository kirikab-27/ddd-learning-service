'use client';

interface HeaderProps {
  title?: string;
}

export function Header({ title = 'DDD実践学習' }: HeaderProps) {
  return (
    <header className="flex items-center justify-between h-[60px] px-6 bg-bg-secondary border-b border-border">
      <div className="flex items-center gap-2">
        <span className="text-2xl">📚</span>
        <span className="text-lg font-semibold text-text-primary">{title}</span>
      </div>
      <nav className="flex items-center gap-4">
        {/* 将来的にユーザーメニュー等を追加 */}
      </nav>
    </header>
  );
}
