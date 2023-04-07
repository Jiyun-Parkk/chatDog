import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { CHAT } from '@/consts/chatType';
import Image from 'next/image';
import { Button, TextField } from '@mui/material';
import { chatDogList } from '@/consts/chatDogInfo';
import { Title } from '@/components';

const Container = styled.section<{ route: string }>`
  padding: 90px 0 30px;
  width: 60%;
  position: relative;
  margin: 0 auto;
  img {
    position: static !important;
    border-radius: 20px;
  }
  article {
    padding: 20px 0;
    p {
      text-align: justify;
      word-break: break-all;
      padding: 10px 0;
      &:last-of-type {
        color: ${({ route }) => (route === CHAT.FORTUNE ? 'darkblue' : 'inherit')};
      }
    }
  }
  form {
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  button {
    width: 100%;
    color: #fff;
    background: rgba(182, 46, 63);
    padding: 10px;
    margin: 20px 0;
    &:hover {
      background-color: rgba(182, 46, 63, 0.8);
    }
  }

  @media (max-width: 750px) {
    width: 85%;
  }
`;

const Detail = () => {
  const router = useRouter();
  const dog = router.query.dog as string;
  const dogInfo = chatDogList.filter((chatdog) => chatdog.title === dog)[0];
  return (
    <Container route={dog}>
      {dog && (
        <>
          <Image src={dogInfo.imgPath} fill alt={dog} priority />
          <Title titleText={dog} subtext={dogInfo.sub} />
          <article>
            {dogInfo.detailtext.map((explain, idx) => (
              <p key={idx}>{explain}</p>
            ))}
          </article>
          {dog === CHAT.FORTUNE ? (
            <form>
              <TextField type="date" />
              <TextField type="time" />
              <Button>{dogInfo.keyword} 물어보러 가기</Button>
            </form>
          ) : (
            <Button>{dogInfo.keyword} 물어보러 가기</Button>
          )}
        </>
      )}
    </Container>
  );
};

export default Detail;
