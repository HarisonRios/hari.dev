import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import './global.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'FullStack Developer - Harison Rios',
  description: 'Portfólio de Harison Rios — Desenvolvedor FullStack de São Paulo. React, Node.js, Python, Docker, AWS.',
  metadataBase: new URL('https://harisonrios.vercel.app'),
  openGraph: {
    type: 'website',
    url: 'https://harisonrios.vercel.app',
    title: 'Harison Rios — FullStack Developer',
    description: 'Portfólio de Harison Rios — Desenvolvedor FullStack de São Paulo.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Harison Rios — FullStack Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Harison Rios — FullStack Developer',
    description: 'Portfólio de Harison Rios — FullStack Developer São Paulo.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={poppins.variable} suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
