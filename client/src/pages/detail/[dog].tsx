import { useRouter } from 'next/router';
import React, { use, useEffect } from 'react';
import styled from 'styled-components';
import { CHAT } from '@/consts/chatType';
import Image from 'next/image';
import { Button, FormHelperText, TextField } from '@mui/material';
import { chatDogList } from '@/consts/chatDogInfo';
import { Title } from '@/components';
import { useForm } from 'react-hook-form';
import { FortuneFormType } from '@/types';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { DateTime } from '@/store/dateTime';

const Container = styled.section<{ route: string }>`
  padding: 90px 0 30px;
  width: 40%;
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

  @media (max-width: 1024px) {
    width: 60%;
  }
  @media (max-width: 750px) {
    width: 85%;
  }
`;

const Detail = () => {
  const router = useRouter();
  const setDateTime = useSetRecoilState(DateTime);
  const dog = router.query.dog as string;
  const dogInfo = chatDogList.filter((chatdog) => chatdog.title === dog)[0];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FortuneFormType>();
  const handleSubmitFortune = (value: FortuneFormType) => {
    const getTime = value.time.split(':');
    setDateTime((prev) => {
      return { ...prev, date: value.date, time: `${getTime[0]}시 ${getTime[1]}분` };
    });
    router.push(`/chat/${dog}`);
  };

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
            <form onSubmit={handleSubmit(handleSubmitFortune)}>
              <TextField
                type="date"
                {...register('date', {
                  required: '날짜를 입력해 주세요',
                  validate: {
                    errorDate: (date: string) => {
                      return new Date() > new Date(date);
                    },
                  },
                })}
              />
              <TextField type="time" {...register('time', { required: '시간을 입력해 주세요' })} />
              <FormHelperText error>
                {errors.date
                  ? errors.date.type === 'errorDate'
                    ? '날짜가 지금보다 미래입니다'
                    : errors.date?.message
                  : errors.time?.message}
              </FormHelperText>
              <Button type="submit">{dogInfo.keyword} 물어보러 가기</Button>
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
