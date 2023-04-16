import React from 'react';
import { Footer, Kakaoshare } from '@/components';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>AI 강아지 챗독</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
        />
      </Head>
      <main>{children}</main>
      <Kakaoshare />
      <Footer />
    </>
  );
};
