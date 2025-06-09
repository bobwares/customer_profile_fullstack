// App: Client Profile Module
// Package: ui
// File: src/app/layout.tsx
// Version: 0.0.13
// Author: Bobwares
// Date: 2025-06-09T00:42:26Z
// Description: Root layout for the Next.js application.
//


import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Client Profile',
  description: 'Client profile management app',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
