import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { chatDogList } from '@/consts/chatDogInfo';
import { KakaoAdFit } from '@/components';

const Container = styled.section`
  ul {
    margin: 0 auto;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
  }
  @media (max-width: 1024px) {
    ul {
      height: auto;
      flex-direction: column;
    }
  }
`;

const DogContentList = styled.li<{ color: string }>`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 20px;
  padding: 30px 0;
  background: ${({ color }) => color};
  p {
    color: #fff;
    padding-left: 24px;
  }
  .main-text {
    height: fit-content;
    p {
      font-size: 28px;
      font-weight: 600;
    }
    .tagbox {
      width: fit-content;
      padding-left: 24px;
      height: 60px;
      display: flex;
      gap: 5px;
      align-items: center;
      flex-wrap: wrap;
      width: 70%;
      span {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 40px;
        padding: 5px;
        color: #fff;
        font-size: 0.8rem;
      }
    }
  }
  img {
    width: 100%;
    height: calc(100vw / 4);
    aspect-ratio: 1 / 1;
    cursor: pointer;
  }

  button {
    width: 90%;
    margin: 0 auto;
    border: 2px solid transparent;
    background: rgba(255, 255, 255, 1);
    color: #000;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 16px;
    cursor: pointer;
    &:hover {
      border: 2px solid rgba(255, 255, 255, 0.5);
      color: #fff;
    }
  }
  @media (max-width: 1024px) {
    img {
      height: auto;
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
            <DogContentList key={list.title} color={list.color.point}>
              <p>{list.sub}</p>
              <div className="main-text">
                {list.mainText.map((text) => (
                  <p>{text}</p>
                ))}
                <div className="tagbox">
                  {list.tag.map((tag, idx) => (
                    <span key={idx}>{tag} </span>
                  ))}
                </div>
              </div>
              <Image
                src={list.imgPath}
                alt={list.title}
                priority
                placeholder="blur"
                onClick={() => handleClickBanner(`/detail/${list.title}`)}
              />
              <article>
                <Button onClick={() => handleClickBanner(`/detail/${list.title}`)}>
                  {list.keyword} 시작하기
                </Button>
              </article>
            </DogContentList>
          ))}
        </ul>
      </section>
      <KakaoAdFit id="DAN-iHu4K4WXJEEUcnyr" />
      <KakaoAdFit id="DAN-uN1thLqMAEjPbvRl" />
    </Container>
  );
}
