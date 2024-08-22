import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';
import Navbar from '~/design-system/navbar';
import './styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: 'Country Details Locator',
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
        <Navbar />
        <main className="flex flex-col items-center justify-center">{children}</main>
      </body>
    </html>
  );
}
