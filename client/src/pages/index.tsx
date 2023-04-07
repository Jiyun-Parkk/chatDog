import Head from 'next/head';
import styled from 'styled-components';

const Container = styled.section`
  height: calc(100vh - 161px);
`;

export default function Home() {
  return (
    <Container>
      <Head>
        <title>AI 강아지 챗독</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <ul>
          <li>
            <h2>포춘독</h2>
          </li>
        </ul>
      </section>
    </Container>
  );
}
