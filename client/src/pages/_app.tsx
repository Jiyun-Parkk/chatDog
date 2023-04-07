import { Layout } from '@/components';
import { GlobalStyle } from '@/styles/globalstyle';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-QDHX3HN0PZ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());

      gtag('config', 'G-QDHX3HN0PZ');`}
      </Script>
    </>
  );
}
