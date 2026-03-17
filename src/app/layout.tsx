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
  description: 'Portfólio - Harison Rios',
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
