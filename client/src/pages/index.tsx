import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { chatDogList } from '@/consts/chatDogInfo';
import { KakaoAdFit, Title } from '@/components';
import { MdChevronRight } from 'react-icons/md';

const Container = styled.section`
  padding-top: 60px;
  ul {
    margin: 0 auto;
    width: 100%;
    display: flex;
    gap: 20px;
    padding: 30px;
    /*justify-content: space-between;*/
    justify-content: center;
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
        cursor: pointer;
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
        background: rgba(182, 46, 63);
        color: #fff;
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 1.1rem;
        padding: 10px;
        margin-top: 20px;
        &:hover {
          background: rgba(182, 46, 65, 0.9);
        }
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
  @media (max-width: 750px) {
    ul {
      width: 100%;
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
      <KakaoAdFit id="DAN-uN1thLqMAEjPbvRl" />
      <section>
        <ul>
          {chatDogList.map((list) => (
            <li key={list.title}>
              <Title titleText={list.title} />
              <Image
                src={list.imgPath}
                alt={list.title}
                sizes="100"
                fill
                priority
                placeholder="blur"
                onClick={() => handleClickBanner(`/detail/${list.title}`)}
              />
              <article>
                <div className="tagbox">
                  {list.tag.map((tag, idx) => (
                    <span key={idx}>{tag} </span>
                  ))}
                </div>
                <p>{list.explain}</p>
                <Button onClick={() => handleClickBanner(`/detail/${list.title}`)}>
                  {list.keyword} 물어보러 가기
                  <MdChevronRight />
                </Button>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <KakaoAdFit id="DAN-iHu4K4WXJEEUcnyr" />
    </Container>
  );
}
