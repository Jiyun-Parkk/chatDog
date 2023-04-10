import Head from 'next/head';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { chatDogList } from '@/consts/chatDogInfo';
import { Title } from '@/components';

const Container = styled.section`
  padding-top: 60px;
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
      <section>
        <ul>
          {chatDogList.map((list) => (
            <li key={list.title}>
              <Title titleText={list.title} />
              <Image src={list.imgPath} fill alt={list.title} priority />
              <article>
                <div className="tagbox">
                  {list.tag.map((tag, idx) => (
                    <span key={idx}>{tag} </span>
                  ))}
                </div>
                <p>{list.explain}</p>
                <Button onClick={() => handleClickBanner(`/detail/${list.title}`)}>
                  {list.keyword} 물어보러 가기 <BsFillArrowRightCircleFill />
                </Button>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </Container>
  );
}
