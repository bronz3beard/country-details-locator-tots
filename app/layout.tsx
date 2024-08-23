import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';
import ContextBootstrap from '~/context/context-bootstrap';
import './styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'Country Explorer',
  description: 'Search for country details'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <head></head>
      <body className="mx-auto flex min-h-screen flex-col items-center justify-start overscroll-none">
        <ContextBootstrap>
          <main className="flex flex-col items-center justify-center">{children}</main>
        </ContextBootstrap>
      </body>
    </html>
  );
}
