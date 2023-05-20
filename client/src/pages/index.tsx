import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import { chatDogList } from '@/consts/chatDogInfo';
import { KakaoAdFit } from '@/components';
import { useEffect, useRef, useState } from 'react';
const Container = styled.section`
  .content-list {
    margin: 0 auto;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  @media (max-width: 1024px) {
    .content-list {
      height: auto;
      flex-direction: column;
    }
  }
`;

const DogContentList = styled.li<{ color: string }>`
  width: 100%;
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
    font-weight: 700;
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

const SideMenu = styled.ul`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 20;
  width: fit-content;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.8);
    width: 70px;
    padding: 20px 0 10px;
    transform: translateY(-10px);
    color: #fff;
    text-align: right;
    font-size: 0.9rem;
    cursor: pointer;
    font-weight: 700;
    transition: 0.5s all;

    &.active {
      background: rgba(255, 255, 255, 0.8);
      color: #000;
      transform: translateY(0);
    }
  }

  @media (max-width: 1024px) {
    display: flex;
  }
`;

export default function Home() {
  const dogRefs = useRef<null[] | HTMLLIElement[]>([]);
  const [currentScroll, setCurrentScroll] = useState<number>(0);
  const router = useRouter();

  const handleClickBanner = (path: string) => {
    router.push(path);
  };
  const dogMenu = chatDogList.map((list) => list.keyword);
  const handleClickDog = (idx: number) => {
    if (dogRefs.current[idx]) {
      const current = dogRefs.current[idx];
      window.scrollTo({
        top: current?.offsetTop,
        left: current?.scrollLeft,
      });
      setCurrentScroll(idx);
    }
  };

  useEffect(() => {
    let getScrollHeight: number[];
    if (dogRefs.current.length > 0) {
      getScrollHeight = dogRefs.current.map((current) => current?.offsetTop) as number[];
    }
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (getScrollHeight[0] <= scrollY && getScrollHeight[1] - 200 > scrollY) {
        setCurrentScroll(0);
      } else if (getScrollHeight[1] - 200 <= scrollY && getScrollHeight[2] - 200 > scrollY) {
        setCurrentScroll(1);
      } else if (getScrollHeight[2] - 200 <= scrollY && getScrollHeight[3] - 200 > scrollY) {
        setCurrentScroll(2);
      } else if (getScrollHeight[3] - 200 <= scrollY) {
        setCurrentScroll(3);
      }
    });
  }, []);

  return (
    <Container>
      <SideMenu>
        {dogMenu.map((dog, idx) => (
          <li
            className={currentScroll === idx ? 'active' : ''}
            key={idx}
            onClick={() => handleClickDog(idx)}
          >
            {dog}
          </li>
        ))}
      </SideMenu>
      <section>
        <ul className="content-list">
          {chatDogList.map((list, idx) => (
            <DogContentList
              ref={(list) => (dogRefs.current[idx] = list)}
              key={list.title}
              color={list.color.point}
            >
              <p>{list.sub}</p>
              <div className="main-text">
                {list.mainText.map((text, idx) => (
                  <p key={idx}>{text}</p>
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
