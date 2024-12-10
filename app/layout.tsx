import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';

import { Jua } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';
import { connectToMongoDB } from '@/shared/database/mongodb/config';
import AuthProvider from '@/shared/components/providers/AuthProvider';
import QueryProvider from '@/shared/components/providers/QueryProvider';
import { ORIGIN } from '@/shared/constants/url';
import Head from 'next/head';

const inter = Jua({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '수정 구슬 속 내 마음',
  description: '수정 구슬 속 따뜻한 마음이 담긴 여러 장식들을 보관해보세요.',
  icons: {
    icon: '/images/favicon.png',
  },
  metadataBase: new URL('/images/favicon.png', ORIGIN),
  robots: 'follow, index',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '수정 구슬 속 내 마음',
    images: [
      {
        url: new URL('/images/crystal.png', ORIGIN),
        width: 400,
        height: 300,
        alt: 'My Heart Crystal',
      },
    ],
    title: '수정 구슬 속 내 마음',
    description: '수정 구슬 속 따뜻한 마음이 담긴 여러 장식들을 보관해보세요.',
    url: ORIGIN,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': '수정 구슬 속 내 마음',
    'description':
      '수정 구슬 속 따뜻한 마음이 담긴 여러 장식들을 보관해보세요.',
    'url': ORIGIN,
    'logo': new URL('/images/favicon.png', ORIGIN),
  };

  connectToMongoDB();

  return (
    <html lang="ko">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          typeof="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <body className={cn(inter.className, 'min-h-svh bg-primary')}>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
        <Analytics />
        <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID || ''} />
      </body>
    </html>
  );
}
