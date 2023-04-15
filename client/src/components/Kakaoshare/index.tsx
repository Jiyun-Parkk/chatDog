import { Button } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const ShareBtn = styled(Button)`
  padding: 0;
  display: block;
  width: 50px;
  height: 50px;
  min-width: 40px;
  position: fixed;
  border: none;
  bottom: 30px;
  right: 20px;
  border-radius: 20px;
  z-index: 30;
  cursor: pointer;
  background: url('/static/images/kakao.png') no-repeat center/cover;
`;
export const Kakaoshare = () => {
  const adRef = useRef<boolean>(false);
  const handelShare = () => {
    //@ts-ignore
    if (window.Kakao) {
      //@ts-ignore
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '운세 알려주는 강아지 챗독',
          description: '운세를 알려주는 AI 강아지 챗독 입니다',
          imageUrl:
            'https://raw.githubusercontent.com/Jiyun1937/chatDog/master/client/public/static/images/fortune.png',
          link: {
            webUrl: 'https://aichatdog.com/',
          },
        },
      });
    }
  };
  useEffect(() => {
    if (adRef.current) {
      return;
    }
    //@ts-ignore
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_ID);
    //@ts-ignore
    window.Kakao.isInitialized();
    adRef.current = true;
  }, []);

  return <ShareBtn onClick={handelShare}></ShareBtn>;
};
