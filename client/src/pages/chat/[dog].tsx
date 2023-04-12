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

const Chatting = styled.section`
  position: relative;
  overflow: hidden;
  .chat-header {
    display: flex;
    align-items: center;
    background: rgb(182, 46, 63);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: fixed;
    width: 100%;
    top: 0px;
    left: 0;
    .chat-header__backbtn {
      position: absolute;
      top: 0;
      left: 0;
      color: #000;
      font-size: 1.3rem;
      padding: 0;
      aspect-ratio: 1 / 1;
    }
    h2 {
      height: 64px;
      line-height: 64px;
      flex: 1;
      text-align: center;
    }
  }
  .chat-window {
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    overflow: auto;
    width: 100%;
    height: calc(100vh - 224px);
    background: rgba(182, 46, 63);
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
          background: #fff;
          padding: 10px;
          border-radius: 10px;
        }
        &.assistant {
          display: flex;
          gap: 10px;
          img {
            border-radius: 20px;
            background: skyblue;
          }
          p {
            background: lightyellow;
          }
        }
        &.user {
          align-self: flex-end;
        }
      }
    }
    .refresh-btn {
      color: #fff;
      font-size: 1.5rem;
      background: rgba(0, 0, 0, 0.5);
      padding: 0;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      margin: 20px auto;
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
          max-width: 80%;
        }
      }
    }
  }
  form {
    width: 100%;
    display: flex;
    input {
      width: 100%;
      padding: 15px;
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
      firstMessage: `당신의 생년월일은 ${dateTime.date}, 태어난 시각은 ${dateTime.time} 이군요! 운세에 대해 어떤 것이든 물어보세요 :)`,
      data: { date: dateTime.date, time: dateTime.time },
      url: 'fortuneTell',
    },
    [CHAT.RECIPE]: {
      placeholder: '오늘은 뭐먹지? 레시피독은 산해진미 레시피를 알고 있어요',
      firstMessage: `레시피에 관해 무엇이던 물어보세요 :)`,
      data: {},
    },
    [CHAT.DIET]: {
      placeholder: '오늘도 두둑한 뱃살.. 내 식단을 부탁해!',
      firstMessage: `오늘도 다이어트를 해볼까요? 어떤 식단을 원하시나요? :)`,
      data: {},
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
  const handleSubmitChat = async (value: { chat: string }) => {
    setUserMessages((prev) => {
      return [...prev, value.chat];
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
        //url: `https://as6o3r7tmcm4kg5cxykm5ubdi40rqvwh.lambda-url.ap-northeast-2.on.aws/${chatInfo[dog].url}`,
        url: `/api/${chatInfo[dog].url}`,
        data: {
          ...chatInfo[dog].data,
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
          { role: 'assistant', content: '요청시간이 초과되었습니다. 새로고침을 해주세요.' },
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
      messageRef.current.scrollIntoView();
    }
    if (loadingRef.current) {
      loadingRef.current.scrollIntoView();
    }
  }, [conversation, isLoading]);

  return (
    <Chatting>
      <section className="chat-header">
        <Button className="chat-header__backbtn" onClick={handleClickBack}>
          <MdArrowBackIosNew />
        </Button>
        <h2>{dog && dog.toUpperCase()} DOG</h2>
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
                  message="챗독은 귀여운 강아지라서 생각하는 시간이 필요해요! :)"
                />
                <Orbit size={16} speed={1.5} color="black" />
              </>
            )}
          </ul>
        )}
        {axiosArror && (
          <Button className="refresh-btn" onClick={handleRefresh}>
            <IoIosRefresh />
          </Button>
        )}
      </section>
      <form onSubmit={handleSubmit(handleSubmitChat)}>
        <input type="text" {...register('chat')} placeholder={dog && chatInfo[dog].placeholder} />
        <Button type="submit" disabled={isLoading}>
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
