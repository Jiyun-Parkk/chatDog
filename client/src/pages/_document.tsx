import Document, { Html, Head, Main, NextScript, DocumentInitialProps } from 'next/document';
import { ReactElement } from 'react';

interface MyDocumentProps extends DocumentInitialProps {
  styleTags: ReactElement;
}

const MyDocument = (props: MyDocumentProps) => {
  return (
    <Html>
      <Head>
        <meta
          name="keywords"
          content="운세, 사주, 타로, 챗봇, chatgpt, gpt, aibot, chatbot, ai, 강아지, 챗독, chatdog, 점성술, 별자리 운세, 띠별 운세, 토정비결, 사주팔자, 신년운세, 띠운세, 연애운, 취업운, 행운, 꿈해몽"
        />
        <meta name="naver-site-verification" content="7ab1754f7b510ee780e8af6cb8323e6441291e29" />
        <meta name="description" content="고민 들어주는 AI 강아지 챗독" />
        <meta name="og:description" content="고민 들어주는 AI 강아지 챗독" />
        <meta name="og:site_name" content="고민 들어주는 AI 강아지 챗독" />
        <meta name="og:title" content="고민 들어주는 AI 강아지 챗독" />
        <meta name="og:url" content="https://aichatdog.com/" />
        <meta name="og:image" content="/static/images/main.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5610907263411318"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
export default MyDocument;
