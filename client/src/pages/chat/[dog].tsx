import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { MdArrowBackIosNew } from 'react-icons/md';
import { CHAT } from '@/consts/chatType';
import { SlPaperPlane } from 'react-icons/sl';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
const Chatting = styled.section`
  position: relative;
  overflow: hidden;
  .chat-header {
    display: flex;
    align-items: center;
    background: rgb(182, 46, 63);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
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
        width: 50%;
        text-align: justify;
        word-break: break-all;
        p {
          background: #fff;
          padding: 10px;
          border-radius: 20px;
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

    @media (max-width: 1024px) {
      ul {
        li {
          width: 70%;
        }
      }
    }
    @media (max-width: 750px) {
      ul {
        li {
          width: 80%;
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

const Chat = () => {
  const router = useRouter();
  const dog = router.query.dog as string;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ chat: string }>();
  const handleClickBack = () => {
    router.back();
  };
  const handleSubmitChat = (value: { chat: string }) => {
    console.log(value);
  };
  return (
    <Chatting>
      <section className="chat-header">
        <Button className="chat-header__backbtn" onClick={handleClickBack}>
          <MdArrowBackIosNew />
        </Button>
        <h2>{dog && dog.toUpperCase()} DOG</h2>
      </section>
      <section className="chat-window">
        <ul>
          <li className="assistant">
            <Image src="/static/images/profile.png" width={40} height={40} alt="profile" priority />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis earum laudantium
              optio nulla neque dolorum corrupti consectetur, magni sed odio accusantium iure, totam
              praesentium aliquid exercitationem fugit dolorem necessitatibus vero?
            </p>
          </li>
          <li className="user">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis earum laudantium
              optio nulla neque dolorum corrupti consectetur, magni sed odio accusantium iure, totam
              praesentium aliquid exercitationem fugit dolorem necessitatibus vero?
            </p>
          </li>
        </ul>
      </section>
      <form onSubmit={handleSubmit(handleSubmitChat)}>
        <input type="text" {...register('chat')} placeholder={dog && chatInfo[dog].placeholder} />
        <Button type="submit">
          <SlPaperPlane />
        </Button>
      </form>
    </Chatting>
  );
};

export default Chat;

const chatInfo = {
  [CHAT.FORTUNE]: {
    placeholder: '당신의 운세에 대해 궁금한 것을 물어보세요',
  },
  [CHAT.RECIPE]: {
    placeholder: '오늘은 뭐먹지? 레시피독은 산해진미 레시피를 알고 있어요',
  },
  [CHAT.DIET]: {
    placeholder: '오늘도 두둑한 뱃살.. 내 식단을 부탁해!',
  },
};
