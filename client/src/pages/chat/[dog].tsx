import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { MdArrowBackIosNew } from 'react-icons/md';
import { CHAT } from '@/consts/chatType';
import { SlPaperPlane } from 'react-icons/sl';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { DateTime } from '@/store/dateTime';
import { KakaoAdFit, Message } from '@/components';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { Orbit } from '@uiball/loaders';
import { IoIosRefresh } from 'react-icons/io';
import { chatDogList } from '@/consts/chatDogInfo';

const Chatting = styled.section<{ color: string }>`
  overflow: hidden;
  .chat-header {
    display: flex;
    align-items: center;
    background: ${({ color }) => color};
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: fixed;
    width: 100%;
    top: 0px;
    left: 0;
    z-index: 10;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
    button {
      padding: 0;
      aspect-ratio: 1 / 1;
      font-size: 1.3rem;
      color: #fff;
      position: absolute;
      top: 0;
    }
    .chat-header__backbtn {
      left: 0;
    }
    h2 {
      height: 64px;
      line-height: 64px;
      flex: 1;
      text-align: center;
      color: #fff;
    }
    .refresh-btn {
      right: 0;
    }
  }
  .chat-window {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 60px;
    overflow: auto;
    width: 100%;
    height: calc(100vh - 180px);
    background: ${({ color }) => color};
    &::-webkit-scrollbar {
      display: none;
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px;
      li {
        width: fit-content;
        max-width: 50%;
        text-align: justify;
        word-break: break-all;
        p {
          font-size: 0.9rem;
          background: #fff;
          padding: 10px;
          border-radius: 10px 0 10px 10px;
          position: relative;
          &::before {
            content: '';
            position: absolute;
            top: 0;
            right: -7px;
            width: 0;
            height: 0;
            border-bottom: 8px solid transparent;
            border-top: 8px solid #fff;
            border-left: 8px solid #fff;
            border-right: 8px solid transparent;
          }
        }
        &.assistant {
          display: flex;
          gap: 10px;
          img {
            border-radius: 20px;
            background: #fff;
          }
          p {
            background: lightyellow;
            border-radius: 0px 10px 10px 10px;
            &::before {
              top: 0;
              left: -7px;
              border-bottom: 8px solid transparent;
              border-top: 8px solid lightyellow;
              border-left: 8px solid transparent;
              border-right: 8px solid lightyellow;
            }
          }
        }
        &.user {
          align-self: flex-end;
        }
      }
    }

    @media (max-width: 1024px) {
      ul {
        li {
          max-width: 70%;
        }
      }
    }
    @media (max-width: 750px) {
      ul {
        li {
          max-width: 100%;
        }
      }
    }
  }
  form {
    width: 100%;
    display: flex;
    input {
      width: 100%;
      padding: 18px;
      border: none;
    }
    button {
      color: #000;
    }
  }
`;

interface ConversationType {
  role: 'assistant' | 'user';
  content: string;
}

const Chat = ({ dog }: { dog: string }) => {
  const router = useRouter();
  const chatRef = useRef<HTMLUListElement>(null);
  const messageRef = useRef<HTMLLIElement>(null);
  const loadingRef = useRef<HTMLLIElement>(null);
  const dateTime = useRecoilValue(DateTime);
  const [axiosArror, setAxiosArror] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userMessages, setUserMessages] = useState<string[]>([]);
  const [assistantMessages, setAssistantMessages] = useState<string[]>([]);
  const chatInfo = {
    [CHAT.FORTUNE]: {
      placeholder: '당신의 운세에 대해 궁금한 것을 물어보세요',
      firstMessage: `당신의 생년월일은 ${dateTime.date}, 태어난 시각은 ${dateTime.time} 이군요! 운세에 대해 어떤 것이든 물어보세요 🔮`,
      data: { date: dateTime.date, time: dateTime.time },
      url: 'fortuneTell',
    },
    [CHAT.RECIPE]: {
      placeholder: '오늘은 뭐먹지? 레시피독은 산해진미 레시피를 알고 있어요',
      firstMessage: `오늘도 맛있는 하루를 보내봐요🍳 어떤 요리가 궁금하신가요?`,
      url: 'recipeTell',
    },
    [CHAT.KCAL]: {
      placeholder: '오늘도 두둑한 뱃살.. 내 식단을 부탁해!',
      firstMessage: `오늘 칼로리를 내일로 미루자...🥦 어떤 식단을 원하시나요? 구성하고 싶은 총 칼로리량과 메뉴 스타일을 말씀해주세요. 예시) 한식 500kcal`,
      url: 'kcalTell',
    },
    [CHAT.DRUNKEN]: {
      placeholder: '오늘도 두둑한 뱃살.. 내 식단을 부탁해!',
      firstMessage: `나는 취한다..오늘도 나에게..헛!🥂 낭만이 필요하신가요? 술에 관해 무엇이던 물어보세요!`,
      url: 'drunkenTell',
    },
  };
  const [conversation, setConversation] = useState<ConversationType[]>([
    { role: 'assistant', content: dog && chatInfo[dog].firstMessage },
  ]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ chat: string }>();
  const handleClickBack = () => {
    router.back();
  };
  const getDogInfo = chatDogList.filter((info) => info.title === dog)[0];
  const handleSubmitChat = async (value: { chat: string }) => {
    setUserMessages((prev) => {
      return [...prev, value.chat.replace(/\n/g, '<br/>')];
    });
    setConversation((prev) => {
      return [...prev, { role: 'user', content: value.chat }];
    });
    setValue('chat', '');
    try {
      setIsLoading(true);
      const { data } = await axios({
        method: 'post',
        //url: `${process.env.NEXT_PUBLIC_API_URL}/${chatInfo[dog].url}`,
        url: `/api/${chatInfo[dog].url}`,
        data: {
          ...chatInfo[dog]?.data,
          userMessages: [...userMessages, value.chat],
          assistantMessages,
        },
      });
      setAssistantMessages((prev) => {
        return [...prev, data.assistant];
      });
      setConversation((prev) => {
        return [...prev, { role: 'assistant', content: data.assistant }];
      });
    } catch (error) {
      setConversation((prev) => {
        return [
          ...prev,
          {
            role: 'assistant',
            content: `${getDogInfo.keyword}이 머리를 너무 써서 어지러운 것 같아요 🥺 새로고침을 해주세요.`,
          },
        ];
      });
      setAxiosArror(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRefresh = () => {
    router.reload();
  };
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ block: 'start' });
    }
    if (loadingRef.current) {
      loadingRef.current.scrollIntoView();
    }
  }, [conversation, isLoading]);

  return (
    <Chatting color={getDogInfo.color.point}>
      <section className="chat-header">
        <Button className="chat-header__backbtn" onClick={handleClickBack}>
          <MdArrowBackIosNew />
        </Button>
        <Button className="refresh-btn" onClick={handleRefresh}>
          <IoIosRefresh />
        </Button>
        <h2>{dog && getDogInfo.keyword}</h2>
      </section>
      <section className="chat-window">
        {dog && (
          <ul ref={chatRef}>
            {conversation.map((message, idx) => (
              <Message
                ref={messageRef}
                key={idx}
                chatter={message.role}
                message={message.content}
              />
            ))}
            {isLoading && (
              <>
                <Message
                  ref={loadingRef}
                  chatter="assistant"
                  message={`${getDogInfo.keyword}은 귀여운 강아지라서 생각하는 시간이 필요해요!`}
                />
                <Orbit size={16} speed={1.5} color="black" />
              </>
            )}
          </ul>
        )}
      </section>
      <form onSubmit={handleSubmit(handleSubmitChat)}>
        <input type="text" {...register('chat')} placeholder={dog && chatInfo[dog].placeholder} />
        <Button type="submit" disabled={isLoading || axiosArror}>
          <SlPaperPlane />
        </Button>
      </form>
      <KakaoAdFit id="DAN-VuJyc1Y6PLZURbsE" />
    </Chatting>
  );
};

export default Chat;

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  return {
    props: {
      dog: context.query.dog,
    },
  };
};
