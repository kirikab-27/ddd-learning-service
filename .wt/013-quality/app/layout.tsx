import type { Metadata } from 'next';
import '@/presentation/styles/globals.css';

export const metadata: Metadata = {
  title: 'DDD Learning Service',
  description: 'DDDの開発手法を実践的に学べるサービス',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
