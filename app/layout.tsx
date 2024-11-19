import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';

import './globals.css';
import { Loader } from '@/components/loader';

const title = "Molly's Specialty Sweets";
const description =
  'Bakery specializing in custom cakes, cupcakes, cookies, and more!';

export const metadata: Metadata = {
  title,
  description,
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider dynamic>
      <html lang="en" className="!scroll-smooth">
        <link rel="icon" href="/favicons/cake-icon-96.png" sizes="96x96" />
        <link rel="icon" href="/favicons/cake-icon-32.png" sizes="32x32" />
        <link rel="icon" href="/favicons/cake-icon-16.png" sizes="16x16" />
        <body className="antialiased">
          <Toaster containerClassName="z-[900000]" />
          <div className="flex flex-col">
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
