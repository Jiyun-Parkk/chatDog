import Head from 'next/head';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';

const Container = styled.section`
  ul {
    margin: 0 auto;
    width: 100%;
    display: flex;
    gap: 20px;
    padding: 30px;
    justify-content: space-between;
    li {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 20px;
      h2 {
        width: fit-content;
        font-size: 1.8rem;
        position: relative;
        &:before {
          content: '';
          width: 100%;
          height: 15px;
          position: absolute;
          bottom: 3px;
          left: 10px;
          z-index: -1;
          background: rgba(182, 46, 63, 0.4);
        }
      }
      img {
        position: static !important;
        border-radius: 20px;
        aspect-ratio: 1 / 1;
      }
      .tagbox {
        padding: 10px 0;
        height: 60px;
        span {
          color: gray;
          font-size: 0.9rem;
        }
      }

      button {
        align-self: flex-start;
        padding: 0;
        color: rgba(182, 46, 63);
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 1.1rem;
      }
    }
  }
  @media (max-width: 1024px) {
    ul {
      width: 80%;
      gap: 50px;
      flex-direction: column;
    }
  }
`;

export default function Home() {
  const router = useRouter();
  const handleClickBanner = (path: string) => {
    router.push(path);
  };
  return (
    <Container>
      <Head>
        <title>AI 강아지 챗독</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <ul>
          {chatDogList.map((list) => (
            <li key={list.title}>
              <h2>{list.title}</h2>
              <Image src={list.imgPath} fill alt={list.title} priority />
              <article>
                <div className="tagbox">
                  {list.tag.map((tag, idx) => (
                    <span key={idx}>{tag} </span>
                  ))}
                </div>
                <p>{list.explain}</p>
                <Button onClick={() => handleClickBanner(list.path)}>
                  {list.go} 물어보러 가기 <BsFillArrowRightCircleFill />{' '}
                </Button>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}

const chatDogList = [
  {
    path: '/chat/fortune',
    title: '포춘독',
    imgPath: '/static/images/fortune.png',
    tag: ['#운세', '#사주', '#취업운', '#연애운', '#건강운', '#시험운', '#토정비결', '#신년운세'],
    explain: '귀여운 포춘독이 당신의 운세를 알려드립니다',
    go: '운세',
  },
  {
    path: '/chat/recipe',
    title: '레시피독',
    imgPath: '/static/images/fortune.png',
    tag: ['#레시피', '#음식', '#요리', '#오늘 뭐먹지?'],
    explain: '레시피독은 이 세상 모든 요리법을 알고 있어요',
    go: '레시피',
  },
  {
    path: '/chat/diet',
    title: '다이어트독',
    imgPath: '/static/images/fortune.png',
    tag: ['#다이어트', '#음식', '#요리', '#식단관리', '#체중감량'],
    explain: '다이어트독으로 당신의 식습관을 바꿔보세요',
    go: '식단',
  },
];
