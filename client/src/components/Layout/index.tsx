import React from 'react';
import { Footer, Header, Kakaoshare } from '@/components';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Kakaoshare />
      <Footer />
    </>
  );
};
