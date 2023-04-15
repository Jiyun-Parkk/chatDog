import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { CHAT } from '@/consts/chatType';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { chatDogList } from '@/consts/chatDogInfo';
import { Header, KakaoAdFit, Title } from '@/components';
import { useForm } from 'react-hook-form';
import { FortuneFormType } from '@/types';
import { useSetRecoilState } from 'recoil';
import { DateTime } from '@/store/dateTime';
import { GetServerSidePropsContext } from 'next';

const Container = styled.section<{ route: string; color: string }>`
  width: 40%;
  position: relative;
  margin: 0 auto;
  article {
    p {
      text-align: justify;
      word-break: break-all;
    }
    .main-text {
      padding: 20px 0;
      font-weight: 700;
      font-size: 22px;
      line-height: 1.5;
    }
    .sub-text {
      p {
        padding: 0;
        color: rgba(0, 0, 0, 0.64);
      }
    }
  }
  form {
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    > label {
      color: #000;
      font-weight: 600;
    }
    .date-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      div {
        width: 100%;
        align-items: end;
        display: flex;
        gap: 5px;
        flex-basis: calc(100% / 3);
        .MuiFormControl-root {
          flex: 1;
        }
      }
    }
    .MuiFormControl-root {
      .MuiInputLabel-root.Mui-focused {
        color: ${({ color }) => color};
      }
      .MuiInputBase-root.Mui-focused fieldset {
        border-color: ${({ color }) => color};
      }
    }
  }
  .submit-btn {
    width: 100%;
    color: #fff;
    background: ${({ color }) => color};
    padding: 15px;
    margin: 20px 0;
    font-size: 1.1rem;
  }

  @media (max-width: 1024px) {
    width: 60%;
  }
  @media (max-width: 750px) {
    width: 90%;
  }
`;

const Detail = ({ dog }: { dog: string }) => {
  const router = useRouter();
  const setDateTime = useSetRecoilState(DateTime);
  const dogInfo = chatDogList.filter((chatdog) => chatdog.title === dog)[0];
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FortuneFormType>();
  const [time, setTime] = useState('모름');

  const handleSubmitFortune = (value: FortuneFormType) => {
    const getDate = `${value.Year}-${value.Month}-${value.Day}`;
    if (new Date() < new Date(getDate)) {
      setError('Year', { message: '날짜가 지금보다 미래입니다' });
      return;
    }
    setDateTime((prev) => {
      return { ...prev, date: getDate, time: value.Time };
    });
    router.push(`/chat/${dog}`);
  };

  const handleMoveChat = () => {
    router.push(`/chat/${dog}`);
  };

  const handleChangeSelectTime = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };

  return (
    <>
      <Container route={dog} color={dogInfo.color.point}>
        <Header />
        <Title titleText={dogInfo.keyword} />
        {dog && (
          <>
            <article>
              <div className="main-text">
                {dogInfo.detailtext.map((detailt, idx) => (
                  <p key={idx}>{detailt}</p>
                ))}
              </div>
              <div className="sub-text">
                {dogInfo.explain.map((explain, idx) => (
                  <p key={idx}>{explain}</p>
                ))}
              </div>
            </article>
            {dog === CHAT.FORTUNE ? (
              <form onSubmit={handleSubmit(handleSubmitFortune)}>
                <InputLabel>생년월일</InputLabel>
                <div className="date-form">
                  {birthInput.map((birth, idx) => (
                    <div key={idx}>
                      <TextField
                        label={birth.label}
                        type="number"
                        {...register(birth.label, {
                          required: '날짜를 입력해 주세요',
                        })}
                        inputProps={{
                          min: birth.min,
                          max: birth.max,
                        }}
                      />
                    </div>
                  ))}
                </div>
                <InputLabel>태어난시</InputLabel>
                <FormControl>
                  <Select {...register('Time')} value={time} onChange={handleChangeSelectTime}>
                    {timeList.map((hour) => (
                      <MenuItem key={hour} value={hour}>
                        {hour}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormHelperText error>{errors[Object.keys(errors)[0]]?.message}</FormHelperText>
                <Button type="submit" className="submit-btn">
                  {dogInfo.button}
                </Button>
              </form>
            ) : (
              <Button className="submit-btn" onClick={handleMoveChat}>
                {dogInfo.button}
              </Button>
            )}
          </>
        )}
      </Container>
      <KakaoAdFit id="DAN-7E5a54fo8kOnJlHQ" />
    </>
  );
};

export default Detail;

export const getServerSideProps = (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      dog: ctx.query.dog,
    },
  };
};

interface BirthInputType {
  label: 'Year' | 'Month' | 'Day';
  min: number;
  max: number;
}
const birthInput: BirthInputType[] = [
  { label: 'Year', min: 1920, max: 2023 },
  { label: 'Month', min: 1, max: 12 },
  { label: 'Day', min: 1, max: 31 },
];

const timeList = [
  '모름',
  '23:00∼1:00',
  '1:00∼3:00',
  '3:00∼5:00',
  '5:00∼7:00',
  '7:00∼9:00',
  '9:00∼11:00',
  '11:00∼13:00',
  '13:00∼15:00',
  '15:00∼17:00',
  '17:00~19:00',
  '19:00∼21:00',
  '21:00∼23:00',
];
