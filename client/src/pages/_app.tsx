import { Layout } from '@/components';
import { DateTime } from '@/store/dateTime';
import { GlobalStyle } from '@/styles/globalstyle';
import { FortuneBirthType } from '@/types';
import cookies from 'next-cookies';
import type { AppContext, AppProps } from 'next/app';
import Script from 'next/script';
import { RecoilRoot, MutableSnapshot } from 'recoil';
import { Analytics } from '@vercel/analytics/react';

interface MyAppProps extends AppProps {
  userBirth: FortuneBirthType;
}
export default function App({ Component, pageProps, userBirth }: MyAppProps) {
  const initialState = ({ set }: MutableSnapshot) => {
    set(
      DateTime,
      userBirth
        ? userBirth
        : {
            date: '',
            time: '',
          }
    );
  };
  return (
    <>
      <RecoilRoot initializeState={initialState}>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
      <Analytics />
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

App.getInitialProps = async ({ ctx }: AppContext) => {
  const { userBirth } = cookies(ctx);
  return { userBirth };
};
