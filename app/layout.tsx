import type { Metadata } from 'next';
import { Jua } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
// import { connectToMongoDB } from '@/shared/database/mongodb/config';
import AuthProvider from '@/shared/components/providers/AuthProvider';
import QueryProvider from '@/shared/components/providers/QueryProvider';

const inter = Jua({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'My Heart Crystal',
  description: '수정 구슬 속 내 마음',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(inter.className, 'min-h-svh bg-primary')}>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
