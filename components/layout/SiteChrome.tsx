'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppBubble from '@/components/ui/WhatsAppBubble';

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  if (isAdmin) {
    return <main id="main-content">{children}</main>;
  }
  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppBubble />
    </>
  );
}
